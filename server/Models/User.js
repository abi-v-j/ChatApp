import mongoose from "mongoose";
import moment from "moment-timezone";

const userSchema = new mongoose.Schema({
  doj: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(), // Use the timezone "Asia/Kolkata" for IST
  },
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
});

// Pre-save middleware to convert the date to IST before saving to the database
userSchema.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});

export default mongoose.model("user", userSchema);
