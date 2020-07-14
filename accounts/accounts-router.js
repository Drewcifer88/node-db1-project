const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then((accounts) => {
            res.status(200).json({ data: accounts })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err.message })
        })
});

router.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then((account) => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(404).json({
                    message: "no account by that ID"
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err.message })
        });
});

router.post("/", (req, res) => {
    const newAccount = req.body;
    if (isValidPost(newPost)) {
        db("accounts")
            .insert(newPost, "id")
            .then((newId) => {
                res.status(201).json({ data: newId })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: err.message });
            })
    } else {
        res.status(400)
            .json({ message: "you have not provide the correct shit" })
    }
});

router.put("/:id", (req, res) => {
    const updatePost = req.body;

    db("accounts")
        .where({ id: req.params.id })
        .update(updatePost)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: "post was not found" })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err.message })
        })
});

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: "not found" })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: err.message })
        })
});

function isValidPost(data) {
    return Boolean(data.name && data.budget)
}

module.exports = router;
