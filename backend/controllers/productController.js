const { Product } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProduct = async (req, res) => {

    const { id } = req.params;

    if(!id) {
        res.status(500).json({ error: 'Id parameter missing!' })
    }

    try {
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };

module.exports = { getAllProducts, getProduct };
