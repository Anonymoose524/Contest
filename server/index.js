const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Import Routes
app.use("/accounts", require("./routes/accounts"));
app.use("/announcements", require("./routes/announcements"));
app.use("/contests", require("./routes/contests"));
app.use("/submissions", require("./routes/submissions"));

app.get("/", (req, res) => {
    res.send("Home page");
});

//Connect to Database
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, 
    () => console.log("Connected to Database"));

//Listen to Server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));