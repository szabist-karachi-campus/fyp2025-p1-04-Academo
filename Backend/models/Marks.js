import mongoose, { mongo } from "mongoose";

const markSchema = new mongoose.Schema({
    darja: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Darja',
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    marks: {
        type: Number,
    }
});

export default mongoose.model('Marks', markSchema);