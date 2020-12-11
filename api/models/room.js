const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const roomSchema = new mongoose.Schema({
    roomId: Number,
    creator: String,
    player: String,
    isEnd: Boolean,
    creatorWinner: Number,
    playerWinner: Number,
    createdTime: Date,
    isPublic: Boolean
});

module.exports = mongoose.model('rooms', roomSchema);