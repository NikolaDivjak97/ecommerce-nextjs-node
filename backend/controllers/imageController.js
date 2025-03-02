const { Image } = require("../models");

const storeImage = async (req, res) => {
  const { productId } = req.body;

  if (req.files && req.files.length > 0) {
    const file = req.files[0];

    const image = await Image.create({
      productId,
      name: file.filename,
      path: `/images/${file.filename}`,
    });

    return res.status(201).json({ id: image.id, path: image.path });
  }

  return res.status(500).json({ error: "An error occurred!" });
};

const deleteImage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const image = await Image.findByPk(id);

    if (!image) {
      return res.status(500).json({ error: "Image not found!" });
    }

    const deleted = await image.destroy();

    if (!deleted) {
      throw new Error("An error occurred.");
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { storeImage, deleteImage };
