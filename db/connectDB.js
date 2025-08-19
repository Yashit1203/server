const mongoose = require('mongoose');
const connectDB = async () => {
    return mongoose.connect(process.env.LIVE_URL)

        .then(() => {
            console.log('MongoDB connected successfully');
        }
        ).catch((error) => {
            console.error('MongoDB connection error:', error);
        });
};
module.exports = connectDB;
