import React, { useState } from "react";
import "./authform.css";

const AuthForm = ({ setLoggedInUser }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError({});
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignup && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      if (isSignup) {
        // Save user with email as key
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        
        // Check if user already exists
        if (users[formData.email]) {
          setError({ email: "Email already registered" });
          return;
        }
        
        users[formData.email] = {
          name: formData.name,
          password: formData.password,
        };
        
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! Please login.");
        toggleMode();
      } else {
        // Login - check credentials
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        const user = users[formData.email];
        
        if (user && user.password === formData.password) {
          localStorage.setItem("loggedInUser", formData.email);
          setLoggedInUser(formData.email);
          alert("Login successful! 🎉");
        } else {
          setError({ login: "Invalid email or password" });
        }
      }
    }
  };

  return (
    <div className="app">
      <div className={`auth-container ${isSignup ? "active" : ""}`}>
        {!isSignup ? (
          <div className="form-box login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                onChange={handleChange}
                autoComplete="email"
              />
              {error.email && <p className="error">{error.email}</p>}

              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                autoComplete="current-password"
              />
              {error.password && <p className="error">{error.password}</p>}
              {error.login && <p className="error">{error.login}</p>}

              <button type="submit">Login</button>
              <p>
                Don't have an account? <span onClick={toggleMode}>Sign Up</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="form-box signup-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                autoComplete="name"
              />
              {error.name && <p className="error">{error.name}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                autoComplete="email"
              />
              {error.email && <p className="error">{error.email}</p>}

              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Create password"
                onChange={handleChange}
                autoComplete="new-password"
              />
              {error.password && <p className="error">{error.password}</p>}

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Re-enter password"
                onChange={handleChange}
                autoComplete="new-password"
              />
              {error.confirmPassword && (
                <p className="error">{error.confirmPassword}</p>
              )}

              <button type="submit">Sign Up</button>
              <p>
                Already have an account? <span onClick={toggleMode}>Login</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;