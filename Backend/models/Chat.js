import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  messages: {
    type: [{
      role: {
        type: String,
        enum: ['assistant', 'user'],
        required: true
      },
      message: {
        type: String,
        required: true

      }
    }],
    default: [],
    _id: false
  }
});
export default mongoose.model('Chat', chatSchema);