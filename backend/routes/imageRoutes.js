const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig");

const { storeImage, deleteImage } = require("../controllers/imageController");

router.post("/store", upload.array("image"), storeImage);
router.post("/delete/:id", deleteImage);

module.exports = router;
