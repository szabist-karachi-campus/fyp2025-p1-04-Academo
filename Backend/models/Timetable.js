import mongoose from "mongoose";

const data = new mongoose.Schema({
    period: {
        type: Number,
    },
    subject: {
        type: String,
    },
    teacher: {
        type: String,
    },
})

const timetableSchema = new mongoose.Schema({
    grade: {
        type: String,
    },
    timetable: [data]
});
export default mongoose.model('Timetable', timetableSchema);
