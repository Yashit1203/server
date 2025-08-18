const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
})

const teachermodel = mongoose.model('teacher', teacherSchema);
module.exports = teachermodel;


