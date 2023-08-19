const mongoose = require('mongoose')

const deptSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    semesters: [
        {
            no: {
                type: String,
            },
            subjects: [
                {
                    name: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Department', deptSchema)