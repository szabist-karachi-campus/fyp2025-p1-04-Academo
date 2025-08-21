import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        require: true
    },
    description: {
        type: String,
        require: true
    },
    darja: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Darja',
        require: true
    },
    availability: {
        type: String,
        require: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        require: true
    }
});

export default mongoose.model('Course', courseSchema);