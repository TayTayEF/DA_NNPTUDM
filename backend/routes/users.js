const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

var protect = require("../middlewares/protect");
const {response} = require("express");
router.get("/", protect, async function (req, res, next) {
  console.log(req.headers.authorization);
  let users = await userModel.find({}).exec();
  responseHandle.renderResponse(res, true, users);
});


router.get ( "/getall" , async  ( req, res) => {
  try {
   const ussers = await  User.find();
   res.json(ussers);
  } catch (error)
  {
    res.status(500).json({ message: "Internal server error" });
  };
})

// Đăng ký người dùng
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );
    res.header("Authorization", `Bearer ${token}`).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/delete/:userId", protect, async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
