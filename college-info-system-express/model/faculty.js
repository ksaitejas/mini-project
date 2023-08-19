const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("Faculty", facultySchema);
