const mongoose = require('mongoose')
const courseschema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    duration: {
        type: String
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
});

const courseModel =new mongoose.model('course', courseschema);
module.exports = courseModel;