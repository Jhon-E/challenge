import { useTransition, useState, useEffect } from "react";
import { User, Product } from "../../../../types/types";

interface Props {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormAddOrder = ({ setIsView }: Props) => {
  const [seller, setSeller] = useState<User | null>(null);
  const [pro, setPro] = useState<Product | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!seller || !pro) {
      setError("Debes seleccionar un usuario y un producto.");
      return;
    }

    startTransition(async () => {
      try {
        const body_request = {
          seller: { id: seller.id },
          total: pro.price,
          orderItems: [{ product: { id: pro.id_pro }, cantidad: 1 }],
        };

        console.log("Enviando:", body_request);

        const res = await fetch("http://localhost:8080/orders/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body_request),
        });

        const res_text = await res.text();

        if (res.ok) {
          setIsView(false);
        } else {
          setError(res_text);
        }
      } catch (e) {
        setError("Error al actualizar: " + e);
      }
    });
  };

  const getData = async () => {
    try {
      const res_users = await fetch("http://localhost:8080/users");
      if (!res_users.ok) throw new Error("Error al obtener usuarios.");
      const res_users_parsed = await res_users.json();
      setUsers(res_users_parsed);
    } catch (e) {
      setError("Error al obtener usuarios: " + e);
    }

    try {
      const res_pro = await fetch("http://localhost:8080/products");
      if (!res_pro.ok) throw new Error("Error al obtener productos.");
      const res_pro_parsed = await res_pro.json();
      setProducts(res_pro_parsed);
    } catch (e) {
      setError("Error al obtener productos: " + e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="absolute h-screen flex justify-center items-center top-0 left-0 w-screen bg-slate-500/10 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Registrar orden
        </h2>
        <svg
          className="absolute top-4 right-4 cursor-pointer"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          onClick={() => setIsView(false)}
        >
          <path
            d="M 10,10 L 30,30 M 30,10 L 10,30"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccione un usuario
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={seller?.id || ""}
              onChange={(e) =>
                setSeller(users.find((u) => u.id === Number(e.target.value)) || null)
              }
            >
              <option value="">Seleccione un usuario</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {`${u.userName} ${u.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccione un producto
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={pro?.id_pro || ""}
              onChange={(e) =>
                setPro(products.find((p) => p.id_pro === Number(e.target.value)) || null)
              }
            >
              <option value="">Seleccione un producto</option>
              {products.map((p) => (
                <option key={p.id_pro} value={p.id_pro}>
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Cargando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
};