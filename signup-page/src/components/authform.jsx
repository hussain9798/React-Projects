import React, { useState } from "react";
import "./authform.css";

const AuthForm = () => {
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

    if (isSignup && !formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@gmail.com"))
      newErrors.email = "Email is invalid";
    if (formData.password.length < 8)
      newErrors.password = "Password must be 8 characters";
    if (isSignup && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

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
        // ✅ Save user in localStorage
        localStorage.setItem("registeredUser", JSON.stringify(formData));
        alert("Signup successfully! Back to login");
        toggleMode();
      } else {
        // ✅ Check login credentials
        const registered = JSON.parse(localStorage.getItem("registeredUser"));
        if (
          registered &&
          registered.email === formData.email &&
          registered.password === formData.password
        ) {
          localStorage.setItem("userEmail", formData.email);
          localStorage.setItem("userPassword", formData.password);
          alert("Login successful 🎉");
        } else {
          setError({ login: "Invalid email or password" });
        }
      }
    }
  };

  return (
    <div className={`auth-container ${isSignup ? "active" : ""}`}>
      {!isSignup ? (
        <div className="form-box login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter emailId"
              onChange={handleChange}
            />
            {error.email && <p className="error">{error.email}</p>}

            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={handleChange}
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
            />
            {error.name && <p className="error">{error.name}</p>}

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {error.email && <p className="error">{error.email}</p>}

            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create password"
              onChange={handleChange}
            />
            {error.password && <p className="error">{error.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-enter password"
              onChange={handleChange}
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
  );
};

export default AuthForm;
