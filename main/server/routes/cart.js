const express =  require('express');
const pool = require('../db');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { user_id, product_id, quantity = 1 } = req.body;
    if (!user_id || !product_id) {
        return res.status(400).json({ error: "Missing user or product id"});
    }

    try {
        // previous cart
        let cartResult = await pool.query(
            'SELECT id FROM carts WHERE user_id = $1', [user_id]
        );

        let cart_id;

        if (cartResult.rows.length === 0) {
            const newCart = await pool.query(
                'INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [user_id]
            );
            cart_id = newCart.rows[0].id;
        } else {
            cart_id = cartResult.rows[0].id;
        }
        
        // previous items
        const itemResult = await pool.query(
            'SELECT quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cart_id, product_id]
        );
        
        if (itemResult.rows.length > 0) {
            // increment quantity
            const newQuantity = itemResult.rows[0].quantity + quantity;
            await pool.query(
                'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3',
                [newQuantity, cart_id, product_id]
            );
        } else {
            await pool.query(
                'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
                [cart_id, product_id, quantity]
            );
        }

        res.status(200).json({ message: 'Product added to cart successfully' });

    } catch (error) {
        console.error('Error in adding to the cart: ', error);
        res.status(500).json({error: 'Internal server error' });
    }
});

module.exports = router;
