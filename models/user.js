const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Joi = require("joi");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    unique: true,
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

userSchema.plugin(AutoIncrement, { inc_field: "id", start_seq: 8 });

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

//CLIENT INPUT VALIDACIJA KOD REGISTRACIJE I PROMJENE
function validateRegister(user) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

//CLIENT INPUT VALIDACIJA KOD LOGIN
function validateLogin(req) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}

//CLIENT INPUT VALIDACIJA KOD NEW
function validateNew(req) {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(4).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(req);
}

exports.User = User;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
exports.validateNew = validateNew;
