const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.json(user);
    } catch (err) {
        res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, {email, password});
    res.json(user);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
});

module.exports = router;
