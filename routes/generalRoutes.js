const JWT = require("jsonwebtoken");
const { User } = require("../models/userModel");

const getHomepage = async (req, res) => {
  res.render("index");
};

const getLogin = async (req, res) => {
  const error = req.flash("error");
  res.render("login", { error });
};

const getRegister = async (req, res) => {
  const error = req.flash("error");
  res.render("register", { error });
};

const getSearchUser = async (req, res) => {
  const error = req.flash("error");
  res.render("search_user");
};

// Get users by searching in input box
const getUsers = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await User.find({
      $or: [
        { fname: new RegExp(id, "i") },
        { lname: new RegExp(id, "i") },
        // { email: new RegExp(id, "i") },
      ],
      $and: [{ isAdmin: false }],
    })
      .then((users) => {
        console.log(users);
        const userFunction = users.map((user) => {
          const container = {};
          container.fname = user.fname;
          container.lname = user.lname;
          container.userid = user.userid;
          // container.email = user.email;
          container.avatar = user.avatar;
          return container;
        });
        res.status(200).json(userFunction);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const viewUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findOne({ userid: id });
    if (userData) {
      const { fname, lname, avatar, bio, company, designation } = userData;
      res.render("other_user_profile", {
        fname,
        lname,
        avatar,
        bio,
        company,
        designation,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAdminDash = async (req, res) => {
  try {
    const jwtToken = req.cookies.jwt;
    if (jwtToken) {
      const { isAdmin } = JWT.verify(jwtToken, process.env.JWT_SECRET);
      if (isAdmin === true) {
        await User.find({})
          .then((users) => {
            const userFunction = users.map((user) => {
              const container = {};
              container.fname = user.fname;
              container.lname = user.lname;
              container.email = user.email;
              container.role = (function () {
                if (user.isAdmin == true) {
                  return "Admin";
                } else {
                  return "User";
                }
              })();
              return container;
            });
            res.render("admin_dash", { users: userFunction });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.render("login", {
          error: ["You are unauthorized to this page"],
        });
      }
    } else {
      res.render("login", {
        error: ["You are not allowed to access this page"],
      });
      // console.log("Failed to verify JWT token while accessing admin_dash");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getDashboard = async (req, res) => {
  try {
    const error = req.flash("error");
    const jwtToken = req.cookies.jwt;
    if (jwtToken) {
      const { email } = JWT.verify(jwtToken, process.env.JWT_SECRET);
      const userData = await User.findOne({ email: email });
      const {
        fname,
        lname,
        email: userEmail,
        avatar,
        bio,
        company,
        designation,
        phonenum,
      } = userData;

      if (userData) {
        res.render("dashboard", {
          fname,
          lname,
          userEmail,
          avatar,
          bio,
          company,
          designation,
          phonenum,
          error,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getLogout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.render("index");
};

module.exports = {
  getHomepage,
  getRegister,
  getLogin,
  getDashboard,
  getAdminDash,
  getLogout,
  getSearchUser,
  getUsers,
  viewUserProfile,
};
