const JWT = require("jsonwebtoken");
const jwtAuth = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (jwtToken) {
    try {
      const verify = JWT.verify(jwtToken, process.env.JWT_SECRET);
      if (verify) {
        if (verify.isAdmin === true) {
          res.redirect("/admin_dash");
        } else {
          next();
        }
      } else {
        res.redirect("/login");
        console.log("Token not validated");
      }
    } catch (error) {
      req.flash("error", "Invalid cookie, Please login again!");
      res.cookie("jwt", "", { maxAge: "1" });
      res.redirect("/login");
    }
  } else {
    // If token is not available
    req.flash("error", "You need to login with valid credentials");
    res.redirect("/login");
  }
};

const jwtUserAuth = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (jwtToken) {
    try {
      const verify = JWT.verify(jwtToken, process.env.JWT_SECRET);
      // console.log(verify);
      if (verify) {
        next();
      } else {
        res.redirect("/login");
        console.log("Token not validated");
      }
    } catch (error) {
      req.flash("error", "Invalid cookie, Please login again!");
      res.cookie("jwt", "", { maxAge: "1" });
      res.redirect("/login");
    }
  } else {
    // If token is not available
    req.flash("error", "You need to login with valid credentials");
    res.redirect("/login");
  }
};

module.exports = { jwtAuth, jwtUserAuth };
