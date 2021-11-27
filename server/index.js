const express = require("express");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Import Routes
const accountsRoute = require("./routes/accounts");
app.use("/accounts", accountsRoute);

const announcementsRoute = require("./routes/announcements");
app.use("/announcements", announcementsRoute);

const contestsRoute = require("./routes/contests");
app.use("/contests", contestsRoute);

app.get("/", (req, res) => {
    res.send("Home page")
});

//Connect to Database
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, 
    () => console.log("Connected to Database"));

//Listen to Server
app.listen(PORT, () => console.log(`Server started on ${PORT}`));