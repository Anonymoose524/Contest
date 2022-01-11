const mongoose = require("mongoose");
const ProblemSchema = require("./problem")

const ContestSchema = mongoose.Schema({
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