import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';
import { socket } from '../services/socket';
import { Send, Video as VideoIcon, Mic, MicOff, VideoOff, MessageSquare, X } from 'lucide-react';

const VideoRoom = ({ userParams, onEndChat }) => {
    const [stream, setStream] = useState(null);
    const [partnerStream, setPartnerStream] = useState(null);
    const [status, setStatus] = useState('Initializing...');
    const [partnerId, setPartnerId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);

    const myVideo = useRef();
    const partnerVideo = useRef();
    const connectionRef = useRef();
    const chatEndRef = useRef();

    useEffect(() => {
        let myStream = null;

        const onConnect = () => {
            console.log('Connected to server:', socket.id);
            setStatus('Looking for someone...');
            socket.emit('find_match', userParams);
        };

        const onConnectError = (err) => {
            console.error('Connection error:', err);
            setStatus(`Connection failed: ${err.message}`);
        };

        const onWaiting = () => {
            setStatus('Waiting for a match...');
        };

        const onMatchFound = ({ partnerId, initiator }) => {
            setStatus('Stranger found! Connecting...');
            setPartnerId(partnerId);
            setMessages([]); // Clear chat on new match

            const peer = new SimplePeer({
                initiator: initiator,
                trickle: true, // Enable Trickle ICE for faster connection
                stream: myStream,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:global.stun.twilio.com:3478' }
                    ]
                }
            });

            peer.on('signal', (data) => {
                socket.emit('signal', { to: partnerId, signal: data });
            });

            peer.on('stream', (currentStream) => {
                setPartnerStream(currentStream);
                setStatus('Connected');
            });

            peer.on('close', () => {
                handlePartnerDisconnect();
            });

            peer.on('error', (err) => {
                console.error('Peer error:', err);
                setStatus('Connection error. Retrying...');
            });

            connectionRef.current = peer;
        };

        const onSignal = ({ from, signal }) => {
            if (connectionRef.current && !connectionRef.current.destroyed) {
                connectionRef.current.signal(signal);
            }
        };

        const onChatMessage = ({ message }) => {
            setMessages(prev => [...prev, { sender: 'stranger', text: message }]);
            if (!showChat) {
                setLastMessage(message);
            }
        };

        const onChatEnded = () => {
            handlePartnerDisconnect();
        };

        socket.on('connect', onConnect);
        socket.on('connect_error', onConnectError);
        socket.on('waiting', onWaiting);
        socket.on('match_found', onMatchFound);
        socket.on('signal', onSignal);
        socket.on('chat_message', onChatMessage);
        socket.on('chat_ended', onChatEnded);

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                myStream = currentStream;
                setStream(currentStream);
                if (myVideo.current) {
                    myVideo.current.srcObject = currentStream;
                }

                if (!socket.connected) {
                    setStatus('Connecting to server...');
                    socket.connect();
                } else {
                    onConnect();
                }
            })
            .catch(err => {
                console.error('Error accessing media devices:', err);
                setStatus('Error: Could not access camera/microphone');
            });

        return () => {
            if (myStream) {
                myStream.getTracks().forEach(track => track.stop());
            }

            socket.off('connect', onConnect);
            socket.off('connect_error', onConnectError);
            socket.off('waiting', onWaiting);
            socket.off('match_found', onMatchFound);
            socket.off('signal', onSignal);
            socket.off('chat_message', onChatMessage);
            socket.off('chat_ended', onChatEnded);

            if (connectionRef.current) {
                connectionRef.current.destroy();
            }
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (partnerVideo.current && partnerStream) {
            partnerVideo.current.srcObject = partnerStream;
        }
    }, [partnerStream]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (lastMessage) {
            const timer = setTimeout(() => {
                setLastMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [lastMessage]);

    const handlePartnerDisconnect = () => {
        setStatus('Stranger disconnected.');
        setPartnerStream(null);
        if (partnerVideo.current) partnerVideo.current.srcObject = null;
        if (connectionRef.current) {
            connectionRef.current.destroy();
            connectionRef.current = null;
        }
    };

    const handleNext = () => {
        if (connectionRef.current) {
            socket.emit('end_chat', { to: partnerId });
            connectionRef.current.destroy();
            connectionRef.current = null;
        }
        setPartnerStream(null);
        setPartnerId(null);
        setMessages([]);
        setStatus('Looking for someone...');
        socket.emit('find_match', userParams);
    };

    const handleStop = () => {
        if (connectionRef.current) {
            socket.emit('end_chat', { to: partnerId });
        }
        onEndChat();
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && partnerId) {
            socket.emit('chat_message', { to: partnerId, message: newMessage });
            setMessages(prev => [...prev, { sender: 'me', text: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <div className="video-room">
            <div className="header">
                <div className="brand">
                    <VideoIcon size={24} className="brand-icon" />
                    <span className="brand-name">unhmegle</span>
                </div>
                <div className={`status-badge ${status === 'Connected' ? 'connected' : ''}`}>
                    <span className="status-dot"></span>
                    {status}
                </div>
                <button onClick={handleStop} className="stop-btn-small">
                    <X size={20} />
                </button>
            </div>

            <div className="main-content">
                <div className="video-grid">
                    <div className="video-wrapper">
                        <video playsInline muted ref={myVideo} autoPlay className="video-element" />
                        <div className="video-label">You</div>
                    </div>
                    <div className="video-wrapper">
                        {partnerStream ? (
                            <video playsInline ref={partnerVideo} autoPlay className="video-element" />
                        ) : (
                            <div className="video-placeholder">
                                <div className="loader"></div>
                                <p>{status}</p>
                            </div>
                        )}
                        <div className="video-label">Stranger</div>
                        {lastMessage && (
                            <div className="message-overlay">
                                <span className="overlay-text">{lastMessage}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`chat-container ${showChat ? 'open' : ''}`}>
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender}`}>
                                <span className="message-text">{msg.text}</span>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={sendMessage} className="chat-input-form">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            disabled={!partnerId}
                        />
                        <button type="submit" disabled={!partnerId || !newMessage.trim()}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="controls-bar">
                <button onClick={handleNext} className="control-btn next-btn">
                    Next Stranger
                    <span className="icon">→</span>
                </button>
                <button
                    className={`control-btn chat-toggle-btn ${showChat ? 'active' : ''}`}
                    onClick={() => setShowChat(!showChat)}
                >
                    <MessageSquare size={20} />
                    <span>Chat</span>
                </button>
                <button onClick={handleStop} className="control-btn stop-btn">
                    Stop
                </button>
            </div>
        </div>
    );
};

export default VideoRoom;
