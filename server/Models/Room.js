import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  roomId: {
    type:String,
  },
  userId:{
    type:String
  }
 

});
export default  mongoose.model('room', roomSchema);