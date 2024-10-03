import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="container mt-5">
      <h1>Welcome, {user}</h1>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
