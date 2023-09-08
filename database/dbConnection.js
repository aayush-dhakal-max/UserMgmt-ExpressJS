const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
      console.log("DB connection successful");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
