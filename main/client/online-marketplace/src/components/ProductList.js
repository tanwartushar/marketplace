import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';
import { UserContext } from '../UserContext';

const API = process.env.REACT_APP_API_BASE_URL;

function ProductList() {
    const [products, setProducts] = useState([]);
    
    const { user } = useContext(UserContext);

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
                <ProductCard key={product.id} product={product} userId={user ? user.id : null}/>
            ))}
        </div>
    );
};

export default ProductList;
