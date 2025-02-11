import React, { use, useState } from "react";
import SideBar from "./components/SideBar";
import { AuthContext } from "../../context/AuthContextProvider";
import ProductsPage from "./ProductsPage/ProductsPage";
import CustomersPage from "./CustomersPage/CustomersPage";
import RouteWithNotFound from "../../routes/RouteWithNotFound";
import OrderPage from "./OrderPage/OrderPage";

const LayoutAdminPages: React.FC = () => {
  const authContext = use(AuthContext);
  const [tab, setTab] = useState<string>("");

  if (!authContext) {
    throw new Error(
      "Para usar el contexto el componente debe estar envuelto en un provider"
    );
  }

  const renderTab = () => {
    switch (tab) {
      case "products":
        return <ProductsPage />;
      case "customers":
        return <CustomersPage />;
      case "orders":
        return <OrderPage />;
      default:
        return <RouteWithNotFound />;
    }
  };

  const { user, setUser } = authContext;

  return (
    <main className="relative h-dvh min-h-dvh w-full flex">
      <SideBar user={user} setUser={setUser} setTab={setTab} />
      <div className="h-full w-dvw p-5">
        <section className="bg-indigo-600 rounded-lg p-5">{renderTab()}</section>
      </div>
    </main>
  );
};

export default LayoutAdminPages;
