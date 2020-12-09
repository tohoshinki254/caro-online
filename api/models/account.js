const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    isAdmin: Boolean,
    isOnline: Boolean,
});

module.exports = mongoose.model('accounts', accountSchema);