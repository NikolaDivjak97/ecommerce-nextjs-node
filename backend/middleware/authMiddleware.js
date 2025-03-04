const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Not authorized." });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized." });
  }
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

module.exports = { authMiddleware, adminMiddleware, authenticateToken };
