import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

function RequireAuth({ children, ...props }) {
  console.dir(props.isLoggedIn)
  return (
    props.isLoggedIn ? children : <Navigate to="/" />
  );
}

export default RequireAuth;