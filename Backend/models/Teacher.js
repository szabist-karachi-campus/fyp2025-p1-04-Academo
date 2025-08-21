import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    role: {
        type: String,
        default: 'Teacher',
        required: true
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    darja: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Darja',
            required: true
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }      
});
export default mongoose.model('Teacher', teacherSchema);
