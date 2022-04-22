const jwt = require("jsonwebtoken");
function verify(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.status(401).send("token nedded for authorization");
  jwt.verify(token, (err, user) => {
    if (err) res.status(401).send("token has been tampered");
    //req.user = user;
    return next();
  });
}
module.exports = verify;
