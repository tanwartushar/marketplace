const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products'
        );
        res.json(result.rows);

    } catch (error) {
        console.error('Error in fetching the products: ', error);
        res.status(500).json({error: 'Server error'});
    }
    // res.send('Products route hit');
});

module.exports = router;
