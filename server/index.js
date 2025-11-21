const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { findMatch, addRequest, removeRequest } = require('./matchmaker');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('find_match', ({ gender }) => {
        console.log(`User ${socket.id} (${gender}) looking for match`);
        const match = findMatch(socket.id, gender);

        if (match) {
            // Notify both users
            io.to(socket.id).emit('match_found', { partnerId: match.id, initiator: true });
            io.to(match.id).emit('match_found', { partnerId: socket.id, initiator: false });
            console.log(`Match found: ${socket.id} <-> ${match.id}`);
        } else {
            addRequest(socket.id, gender);
            socket.emit('waiting');
        }
    });

    socket.on('signal', ({ to, signal }) => {
        io.to(to).emit('signal', { from: socket.id, signal });
    });

    socket.on('chat_message', ({ to, message }) => {
        io.to(to).emit('chat_message', { from: socket.id, message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        removeRequest(socket.id);
        // Notify partner if in chat (this part would need more state management for active chats, 
        // but for now we rely on the peer connection failing or we can broadcast to all just in case, 
        // or better, the client handles the peer disconnect)
        // For a robust app, we should store active matches.
        // Simplified: The client will detect peer disconnect.
    });

    socket.on('end_chat', ({ to }) => {
        io.to(to).emit('chat_ended');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
