const { User, sequelize } = require("../models");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const storeUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const user = await User.create({ name, email, password, isAdmin });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const { name, email, password, isAdmin } = req.body;

    user.update({ name, email, isAdmin });

    if (password) {
      const hashed = await bcrypt.hash(password, 10);

      user.update({ password: hashed });
    }

    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const deleted = await user.destroy();

    if (!deleted) {
      throw new Error("An error occurred.");
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const { name, email, address, phone } = req.body;

    user.update({ name, email, address, phone });

    res.status(201).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const { password, newPassword } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: { password: "Wrong password." } });
    }

    if (password === newPassword) {
      return res.status(401).json({ errors: { newPassword: "New password must be different from old." } });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.update({ password: hashed });

    res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    const { password } = req.body;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: { deletePassword: "Wrong password." } });
    }

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      expires: new Date(0),
    });

    const deleted = await user.destroy();

    if (!deleted) {
      throw new Error("An error occurred.");
    }

    res.json({ success: true });

    res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const table = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const columns = ["id", "isAdmin", "name"];

    const users = await User.findAll({
      limit: pageSize,
      offset: offset,
      attributes: ["id", "name", [sequelize.literal("CASE WHEN isAdmin THEN 'Yes' ELSE 'No' END"), "isAdmin"]],
    });

    const total = await User.count();

    res.json({ users, columns, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, storeUser, updateUser, deleteUser, updateAccount, changePassword, deleteAccount, table };
