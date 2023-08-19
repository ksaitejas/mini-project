const express = require("express");
const router = express.Router();
const Faculty = require("../model/faculty");
const User = require("../model/User");

router.post("/", async (req, res) => {
    const { name, email, password, mobile, address, department, subjects } =
        req.body;

    console.log({
        name,
        email,
        password,
        mobile,
        address,
        department,
        subjects,
    });
    let faculty = new Faculty({
        name,
        email,
        password,
        mobile,
        address,
        department,
        subjects,
    });
    await faculty.save();
    let user = new User({ email, password, role: "Faculty" });
    console.log(user);
    await user.save();
    res.json(faculty);
});

router.get("/", async (req, res) => {
    let faculties = await Faculty.find();
    res.json(faculties);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    let faculty = await Faculty.findById(id);
    res.json(faculty);
});

module.exports = router;
