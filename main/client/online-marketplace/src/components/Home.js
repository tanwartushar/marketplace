import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-main">
        <h1>Welcome to OnlineMarketplace</h1>
        <p>Your one-stop shop for everything you need.</p>
        <Link to="/products" className="shop-now-button">Shop Now</Link>
      </header>
    </div>
  );
}

export default Home;
