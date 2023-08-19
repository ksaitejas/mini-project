const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const marksSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    sgpa:Number,
    semesters: [
        {
            no: String,
            marks: [
                {
                    name: String,
                    mark: Number,
                    credit:Number
                },
            ],
        },
    ],
    cgpa:Number,

});

module.exports = mongoose.model("Mark", marksSchema);
