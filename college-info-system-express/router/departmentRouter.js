const express = require("express");
const router = express.Router();
const Department = require("../model/department");

router.get("/", async (req, res) => {
    const depts = await Department.find();
    console.log(depts[0])
    res.json(depts);
});

router.post("/", async (req, res) => {
    const {name, semesters} = req.body;
    // console.log(name, semesters);
    let dept = new Department({name, semesters});
    await dept.save();
    res.json(dept);
})

router.get("/:deptId", async (req, res) => {
    const { deptId } = req.params;
    const dept = await Department.findById(deptId);
    res.json(dept);
});

router.get("/:deptId/:semId", async (req, res) => {
    const { deptId, semId } = req.params;
    const dept = await Department.findById(deptId);
    dept.semesters.map((sem) => {
        // console.log(sem)
        if(sem._id == semId) {
            // console.log("found: " + sem.id);
            res.json(sem.subjects);
        }
    })
});

module.exports = router;
