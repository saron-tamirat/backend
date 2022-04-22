//const fetch = require("node-fetch");
const axios = require("axios");
const express = require("express");
//const { header } = require("express/lib/request");
//const router = express.Router();
const jwt = require("jsonwebtoken");
function post(req, res) {
  const resp = axios({
    method: "POST",
    url: "http://localhost:3000/User",
    headers: {
      "Content-Type": "application/json",
    },
    data: req.body,
  });
  const username = {
    username: resp.username,
  };
  const accesstoken = jwt.sign(username, process.env.ACCESS_TOKEN_KEY);
  console.log(accesstoken);
  return res.json({ accesstoken: accesstoken });
}
async function getter(req, res) {
  const resp = await axios.get("http://localhost:3000/User");
  const result = resp.data;
  console.log(result);
  res.json(result);
}
module.exports = {
  post,
  getter,
};
