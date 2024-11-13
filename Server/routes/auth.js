import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import middleware from "../middleware/middleware.js";

const secretKey = process.env.SECRET_KEY


const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Register user successfully" });
  } catch (error) {
    res.json(error + "Error in registering user");
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: "User not exists" })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(400).json({ success: false, message: "Wrong Password" })
    }
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" })

    return res.status(200).json({ success: true, token, user: { name: user.name }, message: "User Logged in Successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error in login Route" })
  }
})

router.get('/verify', middleware, async (req, res) => {
  return res.status(200).json({ success: true, message: "User verified successfully", user: req.user })
})
export default router;
