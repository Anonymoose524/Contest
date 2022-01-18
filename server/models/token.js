const mongoose = require("mongoose");
const crypto = require("crypto");

const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        default: function() {
            return crypto.randomBytes(16).toString('hex');
        }
    },
    username: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Token", TokenSchema);