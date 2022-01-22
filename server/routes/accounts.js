const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const Token = require("../models/token");
const events = require("events");
const accountEvent = new events.EventEmitter();

//Account login
router.post("/login", async (req, res) => {
    Account.findOne({username: req.body.username}, (err, account) => {
        if(account === null) {
            return res.status(400).send({
                message: "Username does not exist"
            });
        } else {
            if (account.validPassword(req.body.password)) {
                const newToken = new Token({
                    username: account.username,
                    admin: account.admin
                });
                newToken.save();
                return res.status(201).send({
                    message : "Logged In",
                    newToken: newToken.token
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
            members: req.body.members,
            admin: (req.body.admin ? true : false)
        });
        newAccount.setPassword(req.body.password);
        newAccount.save((err, account) => {
            if(err){
                return res.status(500).send({
                    message: err
                });
            } else {
                const newToken = new Token({
                    username: account.username,
                    admin: account.admin
                });
                newToken.save();
                accountEvent.emit("accountChange");
                return res.status(201).send({
                    message: "Account added successfully",
                    newToken: newToken
                });
            }
        });
    }
});

//Get a token
router.get("/token/:tokenId", async (req, res) => {
    const token = await Token.findOne({token: req.params.tokenId});
    res.json(token);
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
                res.status(404).send("Username does not exist");
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

router.get("/long", async (req, res) => {
    try{
        accountEvent.once("accountChange", async () => {
            const accounts = await Account.find();
            res.json(accounts);
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Get an account by ID
router.get("/:_id", async (req, res) => {
    try {
        const account = await Account.findById(req.params._id);
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
router.delete("/:_id", async (req, res) => {
    Account.findByIdAndDelete(req.params._id, (err, docs) => {
         if(err || docs === null){
            res.status(404).send("Username does not exist");
         } else {
            accountEvent.emit("accountChange");
            res.status(200).json(docs);
            Token.deleteMany({username: docs.username});
         }
    });
});

module.exports = router;