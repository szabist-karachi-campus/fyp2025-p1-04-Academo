import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    users: {
        type: String,
        required: true,
        unique: true
    },
    usersPassword: {
        type: String,
        required: true
    },
    userModel: {
        type: String,
        required: true,
        enum: ['Admin', 'Teacher', 'Student']  
    }
});
export default mongoose.model('User', userSchema);
