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
router.get("/long", async (req, res) => {
    try{
        announcementEvent.once("announcementChange", async () => {
            const announcements = await Announcement.find();
            res.json(announcements);
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
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
        announcementEvent.emit("announcementChange");
    } catch(err) {
        res.json({message: err});
    }
});

//Deletes an announcement by its id
router.delete("/:_id", async (req, res) => {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(req.params._id);
    if(deletedAnnouncement === null) {
        res.status(404).json(null);
    } else {
        announcementEvent.emit("announcementChange");
        res.status(200).json(deletedAnnouncement);
    }
});

module.exports = router;