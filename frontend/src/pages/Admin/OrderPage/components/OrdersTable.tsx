import { Order } from "../../../../types/types";
type Props = {
  orders: Order[];
  setOrder: React.Dispatch<Order>;
};
export const OrdersTable = ({ orders, setOrder }: Props) => {
  return (
    <div className="h-56 overflow-y-scroll rounded-lg">
      <table className="min-w-full text-center text-blue-950 bg-slate-50 shadow-md rounded-xl h-full">
        <thead>
          <tr className="bg-blue-gray-100 text-gray-700">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">ID_usuario</th>
            <th className="py-3 px-4">Nombre del vendedor</th>
            <th className="py-3 px-4">total</th>
            <th className="py-3 px-4">Fecha</th>
            <th className="py-3 px-4">Productos</th>
          </tr>
        </thead>
        <tbody className="text-blue-gray-900">
          {orders?.map((order) => (
            <tr
              className="hover:bg-slate-300 cursor-pointer transition-all"
              key={order.id}
              onClick={() => setOrder(order)}
            >
              <td className="py-3 px-4">{order.id}</td>
              <td className="py-3 px-4">{order.id_user}</td>
              <td className="py-3 px-4">{order.userName}</td>
              <td className="py-3 px-4">{order.total}</td>
              <td className="py-3 px-4">{order.date}</td>
              <td>
                <select name="products">
                  {order.products.map((pro) => (
                    <option key={pro.id_pro}>{pro.product_name}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
