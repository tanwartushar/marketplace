import React, { useState } from 'react';
import '../styles/CartItem.css';

function CartItem({ item }) {
    return(
        <div className='cart-item'>
            {item.image_url && <img src={item.image_url} alt={item.name} />}
            <div className='cart-item-details'>
                <h2>{item.name}</h2>
                <h3>Price: ${item.price}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartItem;
