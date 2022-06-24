const express = require("express");
const router = express.Router();
const Contest = require("../models/contest");
const events = require("events");
const contestEvent = new events.EventEmitter();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

//Get all contests
router.get("/", async (req, res) => {
    try {
        const contests = await Contest.find();
        res.status(200).json(contests);
    } catch(err) {
        res.status(500).json({message: err});
    }
});

//Long poll for all contests
router.get("/long", async (req, res) => {
    try{
        contestEvent.once("contestChange", async () => {
            const contests = await Contest.find();
            res.json(contests);
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Get one contest using contestId
router.get("/:contestId", async (req, res) => {
    const contest = await Contest.findOne({contestId: req.params.contestId});
    if(!contest || Object.keys(contest).length === 0) return res.status(404).send("Contest doesn't exist");
    res.status(200).json(contest);
});

//Long poll for one contest
router.get("/long/:contestId", async (req, res) => {
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

//Add a new contest to the database
router.post("/", async (req, res) => {
    if(await (Contest.exists({title: req.body.title}))){
        res.status(400).send({
            message: "Contest already exists"
        });
    } else {
        const newContest = new Contest({
            contestId: req.body.contestId,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            description: req.body.description
        });
        await newContest.save();
        contestEvent.emit("contestChange")
        res.status(201).send({message: "Contest added"});
    }
});

//Add a new problem to an existing contest
router.post("/problem", async (req, res) => {
    const contest = await Contest.findOne({contestId: req.body.contestId});
    if(!contest || Object.keys(contest).length === 0) return res.status(400).send("Contest doesn't exist");
    if(contest.problems.find(doc => doc.title === req.body.problem.title) !== undefined) return res.status(400).send("Problem already exists");
    contest.problems.push({
        title: req.body.problem.title,
        statement: req.body.problem.statement
    });
    contest.problems.sort((a, b) => a.title.localeCompare(b.title));
    await contest.save();
    contestEvent.emit("contestChange");
    contestEvent.emit(contest.contestId);
    res.status(201).send("Problem added");
});

//Add a testcase for an existing problem in an existing contest
router.post("/testcase", async (req, res) => {
    const contest = await Contest.findOne({contestId: req.body.contestId});
    if(!contest || Object.keys(contest).length === 0) return res.status(400).send("Contest doesn't exist");
    const problem = contest.problems.find(doc => doc.title === req.body.problemTitle);
    if(problem === undefined) return res.status(400).send("Problem doesn't exist");
    problem.testcases.push(req.files.testcase);
    await contest.save();
    contestEvent.emit("contestChange");
    contestEvent.emit(contest.contestId);
    res.status(201).send("Testcase added");
});

//Delete a contest by its id
router.delete("/:_id", async (req, res) => {
    const deletedContest = await Contest.findByIdAndDelete(req.params._id);
    if(deletedContest === null) {
        res.status(404).json(null);
    } else {
        contestEvent.emit("contestChange");
        res.status(200).json(deletedContest);
    }
});

//Delete a problem inside a contest by its id
router.delete("/problem/:contest_id/:problem_id", async (req, res) => {
    //Find the contest and check if it exists
    const contest = await Contest.findOne({"_id": req.params.contest_id});
    if(!contest || Object.keys(contest).length === 0) return res.status(400).send("Contest doesn't exist");
    //Find the problem and check if it exists, then delete
    let index = contest.problems.findIndex((problem) => problem._id.toString() === req.params.problem_id);
    if(index == -1) return res.status(404).send("Problem doesn't exist");
    contest.problems.splice(index, 1);
    //Save updated contest, emit respective event
    await contest.save();
    contestEvent.emit("contestChange");
    contestEvent.emit(contest.contestId);
    res.status(200).json();
});

module.exports = router;