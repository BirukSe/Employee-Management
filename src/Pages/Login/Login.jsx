import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Login({onAuthenticate}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  async function handler(e) {
   
    e.preventDefault(); // Prevent default form submission

    if (!email || !password) { // Check both fields
      setError("Please enter your credentials correctly");
      return; // Exit early if validation fails
    }

    try {
      const response = await fetch("https://employeebackend-154t.onrender.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Corrected header
        body: JSON.stringify({ email, password, isAdmin }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed"); // Set error message from response
        return;
      }

      // Handle successful login
      const data = await response.json();
      console.log("Login successful:", data);
      onAuthenticate();
      navigate('/profile');
      
      // Optionally redirect or perform further actions

    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className="login">
      <div className="tit"><h1>Welcome back</h1></div>
      
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handler}> {/* Add onSubmit to the form */}
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button> {/* Change to type="submit" */}
          {error && <p className="error">{error}</p>} {/* Display error messages */}
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" onChange={() => setAdmin(!isAdmin)} />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Don't have an account?</p>
            <a id="bura" href="/">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
