const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the public directory
app.use(express.static('public'));

let vocabularyList = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send current vocabulary list to a newly connected user
    socket.emit('initialVocabulary', vocabularyList);

    socket.on('newWord', (word) => {
        vocabularyList.push(word);

        // Broadcast the new word to all connected clients
        io.emit('newWord', word);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
