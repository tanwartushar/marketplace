import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
    return (
        <div className='product-card'>
            {product.image_url && <img src={product.image_url} alt={product.name} />}
            <h3>{product.name}</h3>
            <p className='price'>{product.description}</p>
            <strong className='category'>${product.price}</strong>
        </div>
    );
}

export default ProductCard;