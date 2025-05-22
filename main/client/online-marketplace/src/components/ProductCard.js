import React from 'react';
import axios from 'axios';
import '../styles/ProductCard.css';

const API = process.env.REACT_APP_API_BASE_URL;

function ProductCard({ product, userId }) {
    const handleAddToCart = async () => {
        try {
            const res = await axios.post(`${API}/api/cart/add`, {
                user_id: userId,
                product_id: product.id,
                quantity: 1,
                });
                console.log("Product added successfully!")
        } catch (error) {
            console.error('Error in adding to cart: ', error);
        }
    } 

    return (
        <div className='product-card'>
            {product.image_url && <img src={product.image_url} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className='category'>{product.category}</p>
            <strong className='price'>${product.price}</strong>
            <button onClick={handleAddToCart}> Add to cart</button>
        </div>
    );
}

export default ProductCard;