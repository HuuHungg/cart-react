import React from "react";
import Login from "./Login";

function LoginPage({ onLogin }) {
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Welcome to Shop Cart !</h1>
      <Login onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
