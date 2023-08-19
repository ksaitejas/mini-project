const express = require("express");
const router = express.Router();
const Student = require("../model/student");
const User = require("../model/User");

router.post("/", async (req, res) => {
    const { name, email, password, mobile, address, department, marks } =
        req.body;
    console.log(req.body);
    let student = new Student({
        name,
        email,
        password,
        mobile,
        address,
        department,
        marks,
    });
    await student.save();
    let user = new User({ email, password, role: "Student"})
    console.log(user);
    await user.save();
    res.json(student);
});

router.get("/:deptid", async (req, res) => {
    console.log(req.params)
    let deptid = req.params;
    console.log(deptid.deptid)
    if(deptid.deptid.length==1)
    var students = await Student.find();
    else
    var students = await Student.find({department:deptid.deptid});

    res.json(students);
})

router.post("/addMarks", async (req, res) => {
    
})

module.exports = router;