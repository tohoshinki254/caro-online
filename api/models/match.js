const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const matchSchema = new mongoose.Schema({
    roomId: Number,
    match: Number,
    history: Array,
    result: Number, //-1: creator lose, 0: draw, 1: creator win
});

module.exports = mongoose.model('matches', matchSchema);