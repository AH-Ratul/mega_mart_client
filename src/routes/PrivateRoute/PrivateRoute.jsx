import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import CustomToast from "../../hooks/CustomToast";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }

  if (!user) {
    //CustomToast({ type: "error", message: "You Have to Login first" });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
