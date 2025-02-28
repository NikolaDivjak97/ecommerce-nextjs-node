const { Product } = require("../models");
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

const storeProduct = async (req, res) => {
  try {
    const { name, description, stock, price, categories } = req.body;
    const slug = slugify(name, { lower: true, strict: true });
    const product = await Product.create({ name, slug, description, stock, price });

    await product.setCategories(categories);

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const table = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const products = await Product.findAll({
      limit: pageSize,
      offset: offset,
    });

    const total = await Product.count();
    const columns = Object.keys(Product.rawAttributes);

    res.json({ products, columns, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, getProduct, storeProduct, table };
