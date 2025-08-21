import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
    },
    eventDescription: {
        type: String,
    },
    eventImage: {
        type: String,
    },
    eventDate: {
        type: String,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }      
});
export default mongoose.model('Event', eventSchema);
