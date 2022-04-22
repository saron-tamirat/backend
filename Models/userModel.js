const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => v.includes("@"),
      message: (props) => `${props.value} doesnt have @`,
    },
  },
  password: {
    required: true,
    type: String,
    minlength: [8, "length less than 8"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.ObjectId,
  },
  interest: {
    type: mongoose.ObjectId,
  },
  education: [{ ename: String, sdate: String, ldate: String }],
  experience: [{ ename: String, sdate: String, ldate: String }],
});
module.exports = mongoose.model("User", userSchema);
