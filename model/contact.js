const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
    }
})
const contactModel = mongoose.model('contact', contactSchema);
module.exports = contactModel;
