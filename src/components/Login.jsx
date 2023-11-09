import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [err, setError] = useState(null);

  const handleSubmit = () => {
    fetch(`https://api-todo-ebon.vercel.app/api/v1/api-key?email=${email}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi lấy API Key");
        }
        return response.json();
      })
      .then((data) => {
        const apiKey = data.data.apiKey;
        setApiKey(apiKey);
        localStorage.setItem("apiKey", apiKey);
        localStorage.setItem("email", email);

        // Notify the parent component about the successful login
        onLogin();
      });
  };

  return (
    <div>
      <input
        type="text"
        className="login"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="inoutForm" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
