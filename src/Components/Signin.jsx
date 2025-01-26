import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import "../App.css"; // Your existing CSS styles
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to the login API
      const response =  await axios.post(
        "https://auth-service-dot-wellsora-app.uc.r.appspot.com/auth/login",
        
          {
            email: email,
            password: password,
          },
        
      );
      console.log("Protected Data:", response.data);
      const { token, expiresIn } = response.data;
      console.log(typeof expiresIn, expiresIn);
      // Calculate cookie expiry in milliseconds
      const cookieExpiry = expiresIn / (24 * 60 * 60);
      // Set the token in the cookie
      Cookies.set("wellsora_token", token, {
        secure: false,
        expires: cookieExpiry, // Token expiration time in milliseconds
      });
      // console.log(Cookies.get("wellsora_token"));
      console.log("Cookie set successfully, Logged in successfully:");
    } catch (error) {
      // Handle network or other errors
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome</h2>
        <p>Login to your account</p>

        {/* Display error message if any */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Your password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <div className="social-login">
          <button className="social-button google">Sign in with Google</button>
          <button className="social-button facebook">
            Sign in with Facebook
          </button>
        </div>

        <div className="signup-link">
          <p>
            Not have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
      <div className="brand-logo">
        <h1>Wellsora</h1>
      </div>
    </div>
  );
};

export default Login;
