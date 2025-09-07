import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';
import { UserContext } from '../UserContext';

const API = process.env.REACT_APP_API_BASE_URL;

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    
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

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, products]);    

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get(`${API}/api/products/categories`);
            setCategories([...res.data]);
          } catch (e) {
            console.error('Error fetching categories: ', e);
          }
        };
      
        fetchCategories();
      }, []);

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === category));
        }
    };

    return (
        <div className='product-page'> 
            <div className="category-bar">
                <button 
                    className={selectedCategory === "All" ? "active" : ""}
                    onClick={() => filterByCategory("All")}
                >
                    All
                </button>

                {categories.map(cat => (
                    <button
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className='product-list'>
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        userId={user ? user.id : null}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
