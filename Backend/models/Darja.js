import mongoose from "mongoose";

const darjaSchema = new mongoose.Schema({
    darjaID: {
        type: Number,
    },
    teachers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }      
});
export default mongoose.model('Darja', darjaSchema);
