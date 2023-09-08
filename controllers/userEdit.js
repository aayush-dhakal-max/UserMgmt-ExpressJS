const { User } = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const changePassword = async (req, res) => {
  const { oldpass, password } = req.body;
  const email = req.email;
  const user = await User.findOne({ email: email });
  const dbpassword = user.password;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      console.log(errors);
      req.flash("error", errors.errors[0].msg);
      res.redirect("/dashboard");
    } else {
      if ((await bcryptjs.compare(oldpass, dbpassword)) === true) {
        const user = await User.findOneAndUpdate(
          { email: email },
          { password: await bcryptjs.hash(password, 12) },
          { new: true }
        );
        req.flash("error", "Your Password is changed, login with new password");
        res.cookie("jwt", "", { maxAge: "1" });
        res.redirect("/login");
      } else {
        req.flash("error", "The old password is incorrect");
        res.redirect("/dashboard");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const changeUserInfo = async (req, res) => {
  const { fname, lname, email, bio, company, designation, phonenum } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        fname: fname,
        lname: lname,
        bio: bio,
        company: company,
        designation: designation,
        phonenum: phonenum,
      },
      { new: true }
    );
    if (user) {
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { changeUserInfo, changePassword };
