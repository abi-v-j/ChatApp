import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  dateTime: {
    type: String,
    default: () => new Date().toISOString(), 

  },
  message: {
    type:String,
  },
  fromUserId:{
    type:String
  },
  toUserId:{
    type:String
  }
 

});
export default  mongoose.model('room', roomSchema);