// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { UserContext } from './UserContext';
import Home from './components/Home';

function App() {
  const { user, logout } = useContext(UserContext)
  return (
      <Router>
        <nav>
          <Link to="/">Home</Link> | {}
          <Link to="/products">Our Products</Link> | {}
          <Link to="/cart">Cart</Link> | {}

          {!user ? (
            <>
              <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span>Welcome, {user.email}</span> | {/*  use as named in UserContext.js */}     
              <button onClick={logout}>Logout</button>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
  );
}

export default App;
