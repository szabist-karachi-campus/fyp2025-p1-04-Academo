import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    attendance: {
        type: String,
    },
    dateToday: {
        type: String,
    },
    dayToday: {
        type: String,
    }
});

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    darja: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Darja'
    },
    role: {
        type: String,
        default: 'Student',
        required: true
    },
    password:{
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    attendance: {
        type: [attendanceSchema],
    },
    percentage: {
        type: Number,
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }    
});
export default mongoose.model('Student', studentSchema);
