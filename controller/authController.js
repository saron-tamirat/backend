const mongoose = require("mongoose");
const users = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
module.exports = {
  signUp: async function signUp(req, res) {
    try {
      console.log(res);
      const { firstname, lastname, email, password } = req.body;
      const user = await users.exists({ email: email });
      console.log("am at sign up");
      if (user === null) {
        const hashed = await bcrypt.hash(password, 10);
        const user = new users({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hashed,
          gender: req.body.gender,
          birthdate: req.body.birthdate,
          location: req.body.location,
          interest: req.body.interest,
          experience: req.body.experience,
          education: req.body.education,
        });
        const us = await user.save();
        console.log("user", us);
        const token = jwt.sign(
          { firstname, lastname, email },
          process.env.ACCESS_TOKEN_KEY
        );
        console.log(res);
        return res.status(200).json({ token: token });
      }
      res.status(409).send("user already exist please login");
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  logIn: async function logIn(req, res) {
    try {
      const { email, password } = req.body;
      const check = await users.exists({ email: email });
      if (check === null) {
        return res.status(401).send("Hasn't signed up.please signup!");
      }
      const user = await users.findOne({ email: email });
      const { firstname, lastname, password: hashed, email: useremail } = user;
      const checkPassword = await bcrypt.compare(password, hashed);
      if (checkPassword) {
        const token = jwt.sign(
          { firstname, lastname, useremail },
          process.env.ACCESS_TOKEN_KEY
        );
        return res.status(200).json({ token: token });
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};
