const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

const { storeImage, deleteImage } = require("../controllers/imageController");

router.post("/store", authMiddleware, adminMiddleware, upload.array("image"), storeImage);
router.post("/delete/:id", authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
