const mongoose = require("mongoose");

const ProblemSchema = mongoose.Schema({
    title: {
        type: String,
    },
    statement: {
        type: String,
    },
    testcases: {
        type: [mongoose.SchemaTypes.Mixed],
        default: []
    }
});

module.exports = mongoose.model("Problem", ProblemSchema);