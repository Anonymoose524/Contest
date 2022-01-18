const mongoose = require("mongoose");
const ProblemSchema = require("./problem")
const crypto = require("crypto");

const ContestSchema = mongoose.Schema({
    contestId: {
        type: String,
        default: function() {
            return crypto.randomBytes(10).toString("hex");
        }
    },
    title: {
        type: String,
        required: true
    },
    problems: {
        type: [ProblemSchema.schema],
        default: []
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Contest", ContestSchema);