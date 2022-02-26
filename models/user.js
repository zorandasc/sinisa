const mongoose = require("mongoose");
const Joi = require("joi");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024, //HASHED PASSWORD TO MONGODB
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin },
    keys.jwtPrivateKey,
    {
      expiresIn: "1h",
    }
  );
};

const User = mongoose.model("User", userSchema);

//CLIENT INPUT VALIDACIJA
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

//LOGIN INPUT VALIDACIJA
function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
