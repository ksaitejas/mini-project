const express = require("express");
const router = express.Router();
const Attendance = require("../model/attendance");

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

router.post("/", async (req, res) => {
    const { semNo, date, subject, attendance } = req.body;
    console.log({ semNo, date, subject, attendance });
    let att = new Attendance({ semNo, date, subject, attendance });
    await att.save();
    res.json(att);
});

router.get("/:semNo/:date/:subject", async (req, res) => {
    const { semNo, date, subject } = req.params;
    console.log({ semNo, date, subject });
    let att = await Attendance.find({
        semNo: semNo,
        date: date,
        subject: subject,
    });
    console.log(att);
    res.json(att);
});

router.get("/by-student/:semNo/:month/:subject", async (req, res) => {
    const { semNo, month, subject } = req.params;
    // console.log({ semNo, month, subject });
    let att = await Attendance.find({
        semNo: semNo,
        subject: subject,
    });
    console.log(att);
    let fat = att.filter((at) => {
        return (
            at.date
                .toString()
                .split(" ")
                .indexOf(MONTHS[month - 1]) > 0
        );
    });
    res.json(fat);
});

module.exports = router;
