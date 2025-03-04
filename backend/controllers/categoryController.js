const { Category, sequelize } = require("../models");
const slugify = require("slugify");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(500).json({ error: "Category not found!" });
    }
    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const storeCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await Category.create({ name, slug, description });

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const category = await Category.findByPk(id);
    const { name, description } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    category.update({ name, slug, description });

    res.status(201).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json({ error: "Id parameter missing!" });
  }

  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(500).json({ error: "Category not found!" });
    }

    const deleted = await category.destroy();

    if (!deleted) {
      throw new Error("An error occurred.");
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriesSelect = async (req, res) => {
  try {
    const categories = await sequelize.query("SELECT id AS value, name AS label FROM categories", { type: sequelize.QueryTypes.SELECT });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const table = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const offset = (page - 1) * pageSize;

    const columns = ["id", "name", "description"];

    const categories = await Category.findAll({
      limit: pageSize,
      offset: offset,
      attributes: columns,
    });

    const total = await Category.count();

    res.json({ categories, columns, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCategories, getCategory, getCategoriesSelect, storeCategory, updateCategory, deleteCategory, table };
