const express = require("express");
const router = express.Router();
const generalRoutes = require("./generalRoutes");
const { registerUser, loginUser, temp } = require("../controllers/userAuth");
const { registerValidate } = require("../middleware/validator");
const { jwtAuth, jwtUserAuth } = require("../middleware/jwt");
const { upload } = require("../middleware/multerStorage");
const { promoteUser, demoteUser } = require("../controllers/userManage");
const { adminCheck } = require("../middleware/adminCheck");
const { changePassword, changeUserInfo } = require("../controllers/userEdit");
const { checkUser } = require("../middleware/userCheck");

// GET request routes
router.route("/").get(generalRoutes.getHomepage);
router.route("/login").get(generalRoutes.getLogin);
router.route("/register").get(generalRoutes.getRegister);
router.route("/dashboard").get(jwtAuth, generalRoutes.getDashboard);
router.route("/searchuser").get(jwtUserAuth, generalRoutes.getSearchUser);
router.route("/admin_dash").get(generalRoutes.getAdminDash);
router.route("/logout").get(generalRoutes.getLogout);

//User Ruthentication Routes
router.post(
  "/register",
  upload.single("avatar"),
  registerValidate,
  registerUser
);
router.post("/login", loginUser);

// User Role Management Routes
router.post("/promoteUser", adminCheck, promoteUser);
router.post("/demoteUser", adminCheck, demoteUser);

// User Information and Password edit routes

router.post("/changepassword", checkUser, registerValidate, changePassword);
router.post("/changeuserinfo", checkUser, registerValidate, changeUserInfo);

// Get users by search
router.get("/searchuser/:id", jwtUserAuth, generalRoutes.getUsers);
router.get("/user/:id", jwtUserAuth, generalRoutes.viewUserProfile); // User

module.exports = router;
