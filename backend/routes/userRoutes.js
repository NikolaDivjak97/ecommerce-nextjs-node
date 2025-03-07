const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const validate = require("../validators/validator");
const { updateAccountValidationRules } = require("../validators/userValidators");

const { getUser, storeUser, updateUser, deleteUser, updateAccount, changePassword, deleteAccount, table } = require("../controllers/userController");

router.post("/store", authMiddleware, adminMiddleware, storeUser);
router.get("/table", authMiddleware, adminMiddleware, table);
router.post("/account/update", authMiddleware, validate(updateAccountValidationRules), updateAccount);
router.post("/account/change-password", authMiddleware, changePassword);
router.post("/account/delete", authMiddleware, deleteAccount);
router.post("/update/:id", authMiddleware, adminMiddleware, updateUser);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteUser);
router.get("/:id", authMiddleware, adminMiddleware, getUser);

module.exports = router;
