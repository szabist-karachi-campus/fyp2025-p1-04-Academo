import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    fullName: {
        type: String,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: 'Admin',
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },     
});
export default mongoose.model('Admin', adminSchema);