const express = require("express");
const router = express.Router();
const Account = require("../models/account");

//Get an account or get all accounts
router.get("/", async (req, res) => {
    try {
        //If the query is valid and the username exists, return account
        if(typeof req.query.username === "string" && await Account.exists({username: req.query.username})){
            const accounts = await Account.find({username: req.query.username});
            res.json(accounts);
        //Return all accounts
        } else {
            const accounts = await Account.find();
            res.json(accounts);
        }
    } catch(err){
        res.json({message: err});
    }
});

//Get an account by ID
router.get("/:postID", async (req, res) => {
    try {
        const account = await Account.findById(req.params.postID);
        res.json(account);
    } catch(err) {
        res.json({message: err});
    }
});

//Add an account
router.post("/", async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password, //Remember to encrypt password
        members: req.body.members
    });
    try {
        const savedAccount = await account.save();
        res.json(savedAccount);
    } catch(err) {
        res.json({message: err});
    }
});

//Update an account

//Delete an account

module.exports = router;