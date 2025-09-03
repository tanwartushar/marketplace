import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CartItem.css';

const API = process.env.REACT_APP_API_BASE_URL

function CartItem({ item, onUpdate, onRemove }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleUpdate = async () => {
        try {
            await axios.put(`${API}/api/cart/item/${item.cart_item_id}`, { quantity });
            onUpdate(item.cart_item_id, quantity);
        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };

    const handleRemove = async () => {
        try {
            await axios.delete(`${API}/api/cart/item/${item.cart_item_id}`);
            onRemove(item.cart_item_id);
        } catch (err) {
            console.error("Failed to delete item: ", err);
        }
    }

    return(
        <div className="cart-item">
            <img src={item.image_url} alt={item.name} width="50" />
            <div>
                <h4>{item.name}</h4>
                <p>${item.price}</p>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default CartItem;
