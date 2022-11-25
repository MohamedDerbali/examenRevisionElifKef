var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("auth");
});
router.get("/dashboard", async function (req, res, next) {
  const users = await userModel.find({});
  res.render("dashboard", { users });
});
router.post("/auth", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const checkIfUserExists = await userModel.findOne({
      username: username,
      password: password,
    });
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }
    res.redirect("http://localhost:3000/users/dashboard");
  } catch (err) {
    res.redirect("http://localhost:3000/users");
  }
});

router.post("/addUser", async function (req, res, next) {
  try {
    const { username, email } = req.body;
    const checkIfUserExists = await userModel.findOne({
      username: username,
    });
    if (checkIfUserExists) {
      res.send("User already exists");
    } else {
      const newUser = new userModel({
        username: username,
        email: email,
      });
      await newUser.save();
      res.redirect("http://localhost:3000/users/dashboard");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/search", async function (req, res, next) {
  res.render("search");
});
router.post("/search", async function (req, res, next) {
  try {
    const { email } = req.body;
    const checkIfUserExists = await userModel.findOne({
      email: email,
    });
    
    if (checkIfUserExists) {
      res.redirect(`http://localhost:3000/users/details/${checkIfUserExists.email}`);
    }
   
    
  } catch (err) {
    res.redirect("http://localhost:3000/users/search");
  }
});
router.get("/details/:email", async function (req, res, next) {
  const { email } = req.params;
  const user = await userModel.find({ email});

  res.render("details", { users: user });
});
router.get("/delete/:id", async function (req, res, next) {
  const { id } = req.params;
  await userModel.findByIdAndDelete(id);
  res.redirect("http://localhost:3000/users/dashboard");
});
module.exports = router;
