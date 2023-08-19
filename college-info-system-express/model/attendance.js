const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({

    semNo: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    attendance: [
        {
            id: String,
            name: String,
            present: Boolean
        }
    ]
})

module.exports = mongoose.model('Attendance', attendanceSchema)