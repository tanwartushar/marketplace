import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { UserContext } from '../UserContext';
import '../styles/Cart.css';

const API = process.env.REACT_APP_API_BASE_URL;

function Cart() {
    const { user } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCart() {
            if (!user) return; 
            try {
                const res = await axios.get(`${API}/api/cart?user_id=${user.id}`);
                setCartItems(res.data.cart);
            } catch (err) {
                console.error('Failed to load cart:', err);
            }
        }

        fetchCart();
    }, [user]);

    return (
        <div className='cart-list'>
            <h2>Your Cart</h2>

            {!user ? (
                <p>Please log in to view your cart.</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.cart_item_id} item={item} />
                ))
            )}
            
            <div className="cart-summary">
                <h3>Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h3>
            </div>
        </div>
    );
}

export default Cart;
