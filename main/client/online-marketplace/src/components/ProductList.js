import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const API = process.env.REACT_APP_API_BASE_URL;

function ProductList() {
    const [products, setProducts] = useState([]);
    
    const userId = 1; //temp

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${API}/api/products`);
                setProducts(res.data);
            } catch (e) {
                console.error('Error fetching products: ', e);
            }
        }
        fetchProducts();
    },[]);

    return (
        <div className='product-list'>
        {/* <div> <h1>Our Products</h1><ProductList /></div>  */}
            {products.map(product => (
                <ProductCard key={product.id} product={product} userId={userId}/>
            ))}
        </div>
    );
};

export default ProductList;
