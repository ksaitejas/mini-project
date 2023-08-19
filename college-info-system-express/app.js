const express = require("express");
const mongoose = require("mongoose");
const mj=require("mongojs")
const cors = require('cors');

// const url = "mongodb+srv://root:TWoRRns8EOKtsfQM@cluster0.edkxrnq.mongodb.net/college_info_system"
const url = "mongodb://127.0.0.1:27017/college_info_system"
// db user=> root: TWoRRns8EOKtsfQM
urlnew=mj("mongodb://127.0.0.1:27017/college_info_system")
const app = express();

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB: college_info_system');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.use(express.json())
app.use(cors());

const userRouter = require("./router/userRouter");
const loginRouter = require("./router/loginRouter");
const departmentRouter = require("./router/departmentRouter");
const studentRouter = require("./router/studentRouter");
const marksRouter = require("./router/marksRouter");
const facultyRouter = require("./router/FacultyRouter");
const attendanceRouter = require("./router/AttendanceRouter");
const updateMarksRouter = require("./router/updateMarks");
const deleteMarksRouter = require("./router/deletemarks");
app.use("/users", userRouter);
app.use("/", loginRouter)
app.use("/departments", departmentRouter);
app.use("/students", studentRouter);
app.use("/marks", marksRouter);
app.use("/faculty", facultyRouter);
app.use("/attendance", attendanceRouter);
app.use("/updateMarks", updateMarksRouter);
app.use("/deleteMarks", deleteMarksRouter);

app.listen(9000, () => {
    console.log("server started and listening on port: 9000");
});
