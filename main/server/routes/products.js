const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);

    } catch (error) {
        console.error('Error in fetching the products: ', error);
        res.status(500).json({error: 'Server error'});
    }
    // res.send('Products route hit');
});

router.get('/categories', async (req, res) => {
    try {
      const result = await pool.query('SELECT DISTINCT category FROM products');
      const categories = result.rows.map(row => row.category);
      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching categories' });
    }
  });
  

module.exports = router;
