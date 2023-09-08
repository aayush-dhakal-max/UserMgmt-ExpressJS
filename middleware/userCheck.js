const JWT = require("jsonwebtoken");

const checkUser = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  const userEmail = req.body.email;
  if (jwtToken) {
    try {
      const verify = JWT.verify(jwtToken, process.env.JWT_SECRET);
      if (verify && verify.email == userEmail) {
        // This is for passing email to the next middleware
        req.email = verify.email;
        next();
      } else {
        req.flash(
          "error",
          "An error occured while performing the update request"
        );
        res.redirect("/dashboard");
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

module.exports = { checkUser };
