import io from 'socket.io-client';

const SOCKET_URL = 'https://unhmegle.onrender.com';

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ['polling', 'websocket']
}); // Allow polling as fallback
