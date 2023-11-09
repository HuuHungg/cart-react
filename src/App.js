import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useThemeHook } from "./GlobalComponents/ThemeProvider";
import Header from "./components/Header";
import { Router, Redirect, navigate } from "@reach/router";
import LoginPage from "./components/LoginPage";

// Pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

function App() {
  const [theme] = useThemeHook();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Handle successful login, update state
    setLoggedIn(true);
    // Redirect to the home page after login
    navigate("/");
  };

  return (
    <main
      className={theme ? "bg-black" : "bg-light-2"}
      style={{ height: "100vh", overflowY: "auto" }}
    >
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {isLoggedIn && <Header />}
      <Router>
        {isLoggedIn && <Home path="/" />}
        {isLoggedIn && <Cart path="/cart" />}
        {!isLoggedIn && <Redirect noThrow from="/" to="/login" />}
      </Router>
    </main>
  );
}

export default App;
