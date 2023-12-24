import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Replace 'User' with the actual name of the referenced collection
  },
  roomId: {
    type: String,
  },
  toId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Replace 'User' with the actual name of the referenced collection
  }
});

export default mongoose.model('Room', roomSchema);
