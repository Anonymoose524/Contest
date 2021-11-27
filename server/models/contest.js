const mongoose = require("mongoose");

const ContestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    problems: {
        type: [{
            title: {
                type: String,
                required: true
            },
            statement: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Contest", ContestSchema);