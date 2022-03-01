import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/userContext";

//JEDAN NACIN PROTEKCIJE ROUTE
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
