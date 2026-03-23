import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  googleId: String,

  name: String,

  email: String,

  plan: {
    type: String,
    default: "free"
  },

  apiKey: {
    type: String,
    unique: true
  },

  usage: {
    type: Number,
    default: 0
  }

});

export default mongoose.model("User", userSchema);