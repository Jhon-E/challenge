import { useState, useTransition, useEffect } from "react";
import { createPortal } from "react-dom";
import { Order } from "../../../types/types";
import { OrdersTable } from "./components/OrdersTable";
import { FormAddOrder } from "./components/FormAddOrder";

const OrderPage = () => {
    const [orders, setOrders] = useState<Order[]>();
      const [selectOrder, setSelectOrder] = useState<Order>();
      const [showModal, setShowModal] = useState<boolean>(false);
      const [error, setError] = useState<String>();
      const [isPending, startTransition] = useTransition();
    
      const getOrders = () => {
        startTransition(async () => {
          try {
            const res = await fetch("http://localhost:8080/orders");
            if (res.ok) {
              const listOfOrders = await res.json();
              setOrders(listOfOrders);
            } else if (res.status === 409) {
              const res_text = await res.text();
              setError(res_text);
            }
          } catch (e) {
            throw new Error("Error al obtener productos: " + e);
          }
        });
      };
    
      useEffect(() => {
        getOrders();
      }, [showModal, selectOrder]);
    
      return (
        <>
          <div className="rounded-lg w-full flex flex-col">
            <h2 className="text-slate-50 text-4xl font-semibold p-4 self-end">
              Productos
            </h2>
            <div className="bg-gradient-to-r from-blue-200 to-blue-800 h-px"></div>
            <div className="text-right my-2 flex gap-5">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all"
              >
                Agregar producto
              </button>
              <button
                className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
                onClick={() => getOrders()}
              >
                Refrescar
              </button>
            </div>
            {isPending ? (
              <div className="min-w-full flex items-center justify-center min-h-56 text-center text-blue-950 bg-slate-50 shadow-md rounded-xl">
                <p>Cargando</p>
              </div>
            ) : !error ? (
              <>
                <OrdersTable
                  orders={orders ? orders : []}
                  setOrder={setSelectOrder}
                />
              </>
            ) : (
              <p className="text-red-500">{error}</p>
            )}
          </div>
          {showModal && createPortal(<FormAddOrder setIsView={setShowModal}/>, document.body)}
        </>
      );
}
 
export default OrderPage;