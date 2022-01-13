const express = require("express");
const router = express.Router();
const Contest = require("../models/contest");
const events = require("events");
const contestEvent = new events.EventEmitter();


//Gets all the contests
router.get("/", async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch(err) {
        res.status(500).json({message: err});
    }
});

//Long poll for all contests
router.get("/long", async(req, res) => {
    try{
        contestEvent.once("newContest", async () => {
            const contests = await Contest.find();
            res.json(contests);
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Get only one contest using contestId
router.get("/:contestId", async (req, res) => {
    const contest = await Contest.findOne({contestId: req.params.contestId});
    if(Object.keys(contest).length === 0) return res.status(400).send("Contest doesn't exist");
    res.status(200).json(contest);
});

//Long poll for only one contest
router.get("/long/:contestId", async(req, res) => {
    try{
        contestEvent.once(req.params.contestId, async () => {
            const contest = await Contest.findOne({contestId: req.params.contestId});
            res.status(200).json(contest);
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Adds a new contest to the database
router.post("/", async (req, res) => {
    if(await (Contest.exists({title: req.body.title}))){
        res.status(400).send({
            message: "Contest already exists"
        });
    } else {
        const newContest = new Contest({
            title: req.body.title,
            start: req.body.start,
            end: req.body.end
        });
        newContest.save();
        contestEvent.emit("newContest")
        res.status(201).send({message: "Contest added"});
    }
});

//Adds a problem to an existing contest
router.post("/problem", async (req, res) => {
    const contest = await Contest.findOne({title: req.body.title});
    if(Object.keys(contest).length === 0) return res.status(400).send("Contest doesn't exist");
    //Binary search and replace?
    contest.problems.push({
        title: req.body.problem.title,
        statement: req.body.problem.statement
    });
    contest.problems.sort((a, b) => a.title.localeCompare(b.title));
    contest.save();
    contestEvent.emit(contest.contestId);
    res.status(201).send("Problem added");
});

module.exports = router;