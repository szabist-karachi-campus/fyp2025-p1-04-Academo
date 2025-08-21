import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    subjectName:{
        type: String,
    },
    darja: [{
        type: Number,
    }]      
});
export default mongoose.model('Subject', subjectSchema);
