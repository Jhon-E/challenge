import { Product } from "../../../../types/types";
type Props = {
  products: Product[];
  setProduct: React.Dispatch<Product>;
};
export const ProducstTable = ({ products, setProduct }: Props) => {
  return (
    <div className="h-56 overflow-y-scroll rounded-lg">
      <table className="min-w-full text-center text-blue-950 bg-slate-50 shadow-md rounded-xl h-full">
        <thead>
          <tr className="bg-blue-gray-100 text-gray-700">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Vendedor</th>
            <th className="py-3 px-4">Precio</th>
            <th className="py-3 px-4">Stock</th>
            <th className="py-3 px-4">Estado</th>
          </tr>
        </thead>
        <tbody className="text-blue-gray-900">
          {products?.map((pro) => (
            <tr
              className="hover:bg-slate-300 cursor-pointer transition-all"
              key={pro.id_pro}
              onClick={() => setProduct(pro)}
            >
              <td className="py-3 px-4">{pro.id_pro}</td>
              <td className="py-3 px-4">{pro.product_name}</td>
              <td className="py-3 px-4">{pro.seller_username}</td>
              <td className="py-3 px-4">{pro.price}</td>
              <td className="py-3 px-4">{pro.stock}</td>
              <td
                className={`py-3 px-4 ${
                  pro.estate == "A" ? "text-green-500" : "text-red-500"
                }`}
              >
                {pro.estate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
