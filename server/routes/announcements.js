const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const events = require("events");
const announcementEvent = new events.EventEmitter();

//Get an announcement or get all announcement
router.get("/", async (req, res) => {
    try {
        //If the query is valid, search if title exists
        if(typeof req.query.title === "string"){
            //If title exists, return announcement
            if(await Announcement.exists({title: req.query.title})){
                const announcements = await Announcement.find({title: req.query.title});
                res.json(announcements);
            //Title doesn't exist, return 400 error
            } else {
                res.status(400).send("Title doesn't exist");
            }
        //No query, return all announcements
        } else {
            const announcements = await Announcement.find();
            res.json(announcements);
        }
    } catch(err){
        res.json({message: err});
    }
});

//Long poll for announcements
router.get("/long", async(req, res) => {
    try{
        announcementEvent.once("newAnnouncement", async () => {
            const announcements = await Announcement.find();
            res.json(announcements);
        });
    } catch(err){
        console.log(err);
    }
});

//Add an announcement
router.post("/", async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        description: req.body.description, 
    });
    try {
        const savedAnnouncement = await announcement.save();
        res.json(savedAnnouncement);
        announcementEvent.emit("newAnnouncement");
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;