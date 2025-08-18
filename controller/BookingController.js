
const Booking = require("../model/Booking");
const Course = require("../model/Course");

class Bookingcontroller {
    static createBooking = async (req, res) => {
        try {
            const { courseId } = req.params;
            const userId = req.user._id;
            const course = await Course.findById(courseId)
            console.log('controllerCourse=', course)

            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            const newBooking = await Booking.create({
                course: course._id,
                user: userId,
                price: course.price,
            });

            return res.status(201).json({
                message: "Booking create successfully",
                booking: newBooking,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "server error" });
        }
    };

    //static arrorw fumction to get user booking 
    static getUserBookings = async (req, res) => {
        try {
            const UserId = req.user._id;
            const bookings = await Booking.find({ user: UserId })
                .populate("course", "title price")
                .sort({ createAt: -1 });

            return res.status(200).json({ bookings });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "server error" });
        }
    };


    //static arrow function to cancle booking 
    static cancelbooking = async (req, res) => {
        try {
            const { bookingId } = req.params
            const booking = await Booking.findByIdAndUpdate(
                bookingId,
                { status: "cancelled" },
                { new: true }

            )

            if (!booking) {
                return res.status(404).json({ message: "Booking not found" })
            }

            return res.status(200).json({ message: "Booking cancelled successfully", booking })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "server error" })
        }
    }

    static getAllBookings = async (req, res) => {
        try {
            const bookings = await Booking.find()
                .populate("user", "name email")
                .populate("course", "title price")
                .sort({ createdAt: -1 })
            const formatted = bookings.map(b => ({
                _id: b._id,
                userName: b.user.name,
                userEmail: b.user.email,
                courseTitle: b.course.title,
                price: b.course.price,
                status: b.status,
                createdAt: b.createAt
            }))
            res.status(200).json(formatted)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "server error" })
        }
    }
}

module.exports = Bookingcontroller