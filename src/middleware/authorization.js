const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decodedpayload = jwt.verify(token, keys.jwtPrivateKey);
    req.user = decodedpayload;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token.");
  }
};
