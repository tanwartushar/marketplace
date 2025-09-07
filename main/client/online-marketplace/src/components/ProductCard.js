import React, { useContext } from 'react';
import axios from 'axios';
import '../styles/ProductCard.css';
import { UserContext } from '../UserContext';

const API = process.env.REACT_APP_API_BASE_URL;

function ProductCard({ product }) {
    const { user } = useContext(UserContext);

    const handleAddToCart = async () => {
        try {
            if (!user) {
                alert("Please log in to add items to your cart.");
                return;
            }
            const res = await axios.post(`${API}/api/cart/add`, {
                user_id: user.id,
                product_id: product.id,
                quantity: 1,
            });
            console.log("Product added to cart successfully!")
        } catch (error) {
            console.error('Error in adding to cart: ', error);
        }
    } 

    return (
        <div className="product-card">
            {product.image_url && (
                <img src={product.image_url} alt={product.name} className="product-image" />
            )}
            <div className="product-details">
                <div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-button">
                    Add to cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
