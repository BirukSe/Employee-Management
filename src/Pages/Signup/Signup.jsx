import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup({ onAuthenticate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors

    try {
      const response = await fetch('https://employeebackend-154t.onrender.com/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      onAuthenticate(); // Update authentication state
      navigate('/profile'); // Redirect to profile after successful signup
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError(error.message); // Set the error message in state
    }
  };

  return (
    <div className="login">
      <div className="tit"><h1>Welcome to <span>StaffSphere</span></h1></div>
      <div className="login-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>} {/* Display error messages */}
          <div className="form-help">
            <div className="remember">
              <input
                type="checkbox"
                id="isAdmin"
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label htmlFor="isAdmin">Remember Me</label>
            </div>
            <p>Have an account?</p><a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
