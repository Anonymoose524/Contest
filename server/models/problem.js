const mongoose = require("mongoose");

const ProblemSchema = mongoose.Schema({
    title: {
        type: String,
    },
    statement: {
        type: String,
    }
});

module.exports = mongoose.model("Problem", ProblemSchema);