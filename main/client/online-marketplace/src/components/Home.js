import React, { useContext } from "react";
import { UserContext } from "../UserContext";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to Online Marketplace</h1>
      {user ? (
        <p>Hello, {user.email}! Browse our products and add them to your cart.</p>
      ) : (
        <p>Please log in or sign up to start shopping.</p>
      )}
    </div>
  );
}

export default Home;
