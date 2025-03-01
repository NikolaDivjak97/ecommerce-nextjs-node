const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const generateToken = (id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(500).json({ error: "Missing required fields." });
  }

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};

const authenticate = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "isAdmin"] });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout, authenticate };
