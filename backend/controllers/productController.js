const { Product, Image, Category, sequelize } = require("../models");
const slugify = require("slugify");

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const product = await Product.findByPk(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "path"],
        },
        {
          model: Category,
          as: "Categories",
          through: { attributes: [] },
          attributes: ["id", "name"],
        },
      ],
    });

    if (!product) {
      return res.status(500).json({ error: "Product not found!" });
    }

    const categories = await sequelize.query("SELECT id AS value, name AS label FROM categories", { type: sequelize.QueryTypes.SELECT });

    res.json({ product, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const storeProduct = async (req, res) => {
  try {
    const { name, description, stock, price, categories } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const product = await Product.create({ name, slug, description, stock, price });

    await product.setCategories(categories);

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        productId: product.id,
        name: file.filename,
        path: `/images/${file.filename}`,
      }));

      await Image.bulkCreate(images);
    }

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const product = await Product.findByPk(id);
    const { name, description, stock, price, categories } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    product.update({ name, slug, description, stock, price });

    await product.setCategories(categories);

    res.status(201).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(500).json({ error: "Product not found!" });
    }

    const deleted = await product.destroy();

    if (!deleted) {
      throw new Error("An error occurred.");
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const table = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const columns = ["id", "slug", "name", "price", "stock"];

    const products = await Product.findAll({
      limit: pageSize,
      offset: offset,
      attributes: columns,
    });

    const total = await Product.count();

    res.json({ products, columns, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, getProduct, editProduct, storeProduct, updateProduct, deleteProduct, table };
