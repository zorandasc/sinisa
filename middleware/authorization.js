const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

module.exports = function (req, res, next) {
  if (!req.header("Authorization").startsWith("Bearer ")) {
    return res.status(401).send("Access denied. No token provided");
  }
  const TokenArray = req.header("Authorization").split(" ");
  //POSTO JE TokenArray[1] string 'null' 
  if (TokenArray[1] === "null" || TokenArray[1] === "") {
    return res.status(401).send("Access denied. No token provided");
  }

  try {
    const decodedpayload = jwt.verify(TokenArray[1], keys.jwtPrivateKey);
    req.user = decodedpayload;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token.");
  }
};
