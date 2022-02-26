const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");
const { User, validateUser, validateLogin } = require("../models/user");

router.get("/list", auth, async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("Korisnik ne Postoji.");
  res.send(user);
});

//REGISTRACIJA
router.post("/register", async (req, res) => {
  //VALIDACIJU CLIENT INPUTA
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //PROVJERI DA LI VEC POSTOJI EMAIL U BAZI
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Korisnik sa tim email vec postoji.");
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send({ username: user.username, email: user.email });
});

//LOGIN
router.post("/login", async (req, res) => {
  //SANITIZACIJA CLIENT INPUT
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  //PROVJERI DA LI POSTOJI EMAIL
  if (!user) return res.status(400).send("Pogresan email.");

  //PROVJERI VALIDNOST PASSWORDA
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Pogresan password.");

  //GENERISI TOKEN
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send({ username: user.username, email: user.email });
});

router.put("/:id", auth, async (req, res) => {
  //SANITIZACIJA CLIENT INPUTA
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);

  if (!user) return res.status(404).send("Korisnik ne Postoji.");

  //AKO MIJENJA EMAIL PROVJERI DA LI VEC POSTOJI, POSTO EMAIL
  //MORA BITI UNIQUE
  if (req.body.email !== user.email) {
    let anotherUser = await User.findOne({ email: req.body.email });

    if (anotherUser) {
      return res.status(400).send("Korisnik sa tim email vec postoji.");
    }
  }

  user.username = req.body.username;
  user.email = req.body.email;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res.send({
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("Korisnik ne Postoji.");
  res.send(user);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("THIS ID DOESNOT EXISTE");
  res.send(user);
});

module.exports = router;
