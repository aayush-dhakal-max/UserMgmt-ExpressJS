const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { validationResult } = require("express-validator");
const { createHash } = require("../utils/hashGen");

const registerUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    req.flash("error", errors.errors[0].msg);
    res.redirect("/register");
  } else {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      await User.create({
        userid: createHash(email),
        fname: fname,
        lname: lname,
        email: email,
        password: await bcryptjs.hash(password, 12),
        avatar: (function () {
          if (req.file) {
            const path = req.file.path;
            return path.slice(5);
          } else {
            return "/image/avatar.bmp";
          }
        })(),
      })
        .then((result) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { email, isAdmin: false },
            process.env.JWT_SECRET,
            {
              expiresIn: maxAge,
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
            sameSite: "Strict",
          });
          console.log(`User "${fname}" successfully created`);
          res.redirect("/dashboard");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      req.flash("error", "User with that email already exists");
      res.redirect("/register");
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({
    email: email,
  })
    .then((result) => {
      if (result && bcryptjs.compareSync(password, result.password) === true) {
        const isAdmin = result.isAdmin;
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ email, isAdmin }, process.env.JWT_SECRET, {
          expiresIn: maxAge,
        });
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          sameSite: "Strict",
        });
        res.redirect("/dashboard");
      } else {
        req.flash("error", "Invalid email or password");
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const temp = async (req, res) => {
  console.log(req.body);
};

module.exports = { registerUser, loginUser, temp };
