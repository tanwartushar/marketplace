import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import '../styles/Navbar.css'; 

function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">OnlineMarketplace</Link>
      </div>

      <div className="navbar-links">
        <Link to="/products">Our Products</Link>
        <Link to="/cart">Cart  </Link>
        {user ? (
          <>
            <div className='user-info'>
                <span className='welcome-text'>Welcome</span>
                <span className='user-email'>{user.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
