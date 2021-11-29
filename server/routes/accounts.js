const express = require("express");
const router = express.Router();
const Account = require("../models/account");

//Account login
router.post("/login", async (req, res) => {
    Account.findOne({username: req.body.username}, (err, account) => {
        if(account === null) {
            return res.status(400).send({
                message: "Username does not exist"
            });
        } else {
            if (account.validPassword(req.body.password)) {
                return res.status(201).send({
                    message : "Logged In"
                });
            } else {
                return res.status(400).send({
                    message : "Wrong Password"
                });
            }
        }
    })
});

//Account signup 
router.post("/signup", async (req, res) => {
    
    if(await (Account.exists({username: req.body.username}))){
        res.status(400).send({
            message: "Username taken"
        });
    } else {
        const newAccount = new Account({
            username: req.body.username,
            members: req.body.members
        });
        newAccount.setPassword(req.body.password);
        newAccount.save((err, account) => {
            if(err){
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.status(201).send({
                    message: "Account added successfully"
                });
            }
        });
    }
});

//Get an account or get all accounts
router.get("/", async (req, res) => {
    try {
        //If the query is valid, search if username exists
        if(typeof req.query.username === "string"){
            //If username exists, return username
            if(await Account.exists({username: req.query.username})){
                const accounts = await Account.find({username: req.query.username});
                res.json(accounts);
            //Username doesn't exist, return 400 error
            } else {
                res.status(400).send("Username does not exist");
            }
        //No username query, return all accounts
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

//Add an account without hashing, only for testing
router.post("/", async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password, //Password not encrypted
        members: req.body.members
    });
    try {
        const savedAccount = await account.save();
        res.json(savedAccount);
    } catch(err) {
        res.json({message: err});
    }
});

//Update an existing account by username


//Delete an account by ID
router.delete("/:id", (req, res) => {
    Account.findByIdAndDelete(req.params.id, (err, docs) => {
         if(err || docs == null){
            res.status(400).send("Username does not exist");
         } else {
            res.json(docs);
         }
    })
});

module.exports = router;