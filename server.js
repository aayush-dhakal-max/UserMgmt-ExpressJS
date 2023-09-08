const express = require("express");
const http = require("http");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dbConnect = require("./database/dbConnection");
const flash = require("connect-flash");
const session = require("express-session");
const morgan = require("morgan");

require("dotenv").config();
app.use(cookieParser());
app.use(
  session({
    secret: "secretforsession",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 6000, httpOnly: true, sameSite: "Strict" },
  })
);

// app.use(morgan("dev"));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/views")));
app.set("views", path.join(__dirname + "/views"));

app.use("/", require("./routes/routes"));

dbConnect();

const server = http.createServer(app).listen(5000, "0.0.0.0", () => {
  console.log(`Server started at http://localhost:5000`);
});
