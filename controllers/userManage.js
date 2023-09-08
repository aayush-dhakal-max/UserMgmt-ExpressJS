const { User } = require("../models/userModel");

const promoteUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate(
    { email: email },
    { isAdmin: true },
    {
      new: true,
    }
  );
  if (user) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(200).json({ message: "failed" });
  }
};

const demoteUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate(
    { email: email },
    { isAdmin: false },
    {
      new: true,
    }
  );
  if (user) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(200).json({ message: "failed" });
  }
};

module.exports = { promoteUser, demoteUser };
