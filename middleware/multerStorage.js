const multer = require("multer");
const path = require("path");

const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views/image/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: myStorage });

module.exports = { myStorage, upload };
