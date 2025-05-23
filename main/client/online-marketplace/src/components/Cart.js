import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import '../styles/Cart.css';

const API = process.env.REACT_APP_API_BASE_URL;

function Cart({ userId }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            try {
                const res = await axios.get(`${API}/api/cart?user_id=${userId}`);
                setCartItems(res.data.cart);
            } catch (err) {
                console.error('Failed to load cart:', err);
            }
        }

        fetchCart();
    }, [userId]);

    return (
        <div className='cart-list'>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.cart_item_id} item={item} />
                ))
            )}
        </div>
    );
}

export default Cart;
