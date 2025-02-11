import React from "react";
import { Outlet, Navigate } from "react-router";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectTo = "/login",
}) => {
  return isAllowed ? <Outlet /> : <Navigate replace to={redirectTo} />;
};

export default ProtectedRoute;