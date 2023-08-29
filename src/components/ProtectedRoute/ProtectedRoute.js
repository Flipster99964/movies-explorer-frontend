import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children, ...props }) {
  return (
    props.isLoggedIn ? children : <Navigate to="/" />
  );
}

export default RequireAuth;