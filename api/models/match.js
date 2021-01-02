const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const matchSchema = new mongoose.Schema({
    roomId: Number,
    match: Number,
    history: Array,
    isCreatorWinner: Boolean
});

module.exports = mongoose.model('matches', matchSchema);