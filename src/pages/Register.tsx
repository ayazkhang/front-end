import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import SidebarAlert from "../components/SidebarAlert"; 

const Register: React.FC = () => {
  const { register } = useAuth();
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData?.password !== userData?.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(userData);
      setSuccess(true); // Set success state to true
      setError(null); // Clear any existing error
    } catch (err) {
      setError("Registration failed");
      setSuccess(false); // Ensure success is false if registration fails
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <SidebarAlert 
        message={success ? "User registered successfully!" : error} 
        type={success ? "success" : "error"} 
      />

      <div
        className="card p-4 shadow-lg"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <h2 className="text-center mb-4">Register</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={userData?.email}
              onChange={(e) => setUserData({
                ...userData,
                email: e.target.value
              })}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text" // Changed to 'text' instead of 'username'
              className="form-control"
              id="username"
              value={userData?.username}
              onChange={(e) => setUserData({
                ...userData,
                username: e.target.value
              })}
              required
              placeholder="Enter your username"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={userData?.password}
              onChange={(e) => setUserData({
                ...userData,
                password: e.target.value
              })}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={userData?.confirmPassword}
              onChange={(e) => setUserData({
                ...userData,
                confirmPassword: e.target.value
              })}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
