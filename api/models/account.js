const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    isAdmin: Boolean,
    isOnline: Boolean,
    isLocked: Boolean,
    isConfirmed: Boolean,
    inRoom: Boolean,
    cups: Number,
    wins: Number,
    loses: Number,
    draws: Number,
});

module.exports = mongoose.model('accounts', accountSchema);