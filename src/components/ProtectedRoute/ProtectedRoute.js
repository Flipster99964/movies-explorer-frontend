import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

function RequireAuth({ children, ...props }) {
  return (
    !props.isLoggedIn ? children : <Navigate to="/" />
  );
}

export default RequireAuth;