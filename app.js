require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

// const jwt = require("jsonwebtoken");
//const request = require("./requester");
//const verify = require("./auth");

const app = express();
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/akababi", () => {
  console.log("data base connection succes");
});
// app.use("/User", verify, request.getter);
//const mongoose = require("mongoose");

app.use("/api/user/", userRoute);
//const user = userSchema();
// const SingleUser = new User({
//   firstname: "saront",
//   lastname: "tma",
//   email: "sarr@hh",
//   password: "saron tamirat",
//   gender: "female",
//   birthdate: "13/04/2000",
// });
// const create = async () => {
//   try {
//     const user = await SingleUser.save();
//     console.log(user);
//   } catch (e) {
//     console.log(e);
//   }
// };
// create();
// app.post("/User", request.post);
app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}....`);
});
