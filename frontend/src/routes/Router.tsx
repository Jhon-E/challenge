import { Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute.tsx";
import RouteWithNotFound from "./RouteWithNotFound.tsx";
import LogIn from "../auth/pages/LogIn.tsx";
import SignIn from "../auth/pages/SignIn.tsx";
import { use } from "react";
import { AuthContext } from "../context/AuthContextProvider.tsx";
import LayoutAdminPages from "../pages/Admin/LayoutAdminPages.tsx";

const Router = () => {
  const authContext = use(AuthContext);

  if (!authContext) {
    throw new Error(
      "Para usar el contexto el componente debe estar envuelto en un provider"
    );
  }

  const { user } = authContext;

  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/admin/*"
        element={<ProtectedRoute isAllowed={user && user.role === "Admin"} />}
      >
        <Route path="dashboard" element={<LayoutAdminPages />} />
      </Route>
      <Route path="*" element={<RouteWithNotFound />} />
    </Routes>
  );
};

export default Router;
