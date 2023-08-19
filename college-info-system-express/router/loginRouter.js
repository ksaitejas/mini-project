const express = require("express");
const router = express.Router();
const User = require("../model/User");
const student = require("../model/student");
const faculty = require("../model/faculty");

router.post("/login", async (req, res) => {
    let resp = {};
    let acuser;
    const { email, password, role } = req.body;
    console.log({ email, password, role });
    let user = await User.findOne({ email: email });
    if (role == "Student") {
        acuser = await student.findOne({ email: email });
        console.log("Hi")
        console.log(acuser);
    } else if (role == "Faculty") {
        acuser = await faculty.findOne({ email: email});
        //console.log(acuser);
    }
    if (user != null) {
        console.log(user)
        let dbpass = user.password;
        if (dbpass == password) {
            if (role == user.role) {
                resp.message = `User logged in with email: ${email}`;
                resp.role = role;
                resp.id = acuser._id;
                resp.name=acuser.name;
                res.status(200).json(resp);
            } else {
                resp.message = `${role} not found with email: ${email}`;
                res.status(403).json(resp);
            }
        } else {
            resp.message = `Incorrect password for user with email: ${email}`;
            res.status(401).json(resp);
        }
    } else {
        resp.message = `User not found with email: ${email}`;
        res.status(404).json(resp);
    }
});

router.post("/register", async (req, res) => {});

module.exports = router;
