import { useRef, useTransition } from "react";
import { Product } from "../../../../types/types";

type Props = {
  product: Product;
  setProduct: React.Dispatch<Product>;
};
export const DetailsProduct = ({ product, setProduct }: Props) => {
  const [isPending, startTransition] = useTransition();
  const nameElem = useRef<HTMLInputElement | null>(null);
  const priceElem = useRef<HTMLInputElement | null>(null);
  const stockElem = useRef<HTMLInputElement | null>(null);
  const stateElem = useRef<HTMLSelectElement | null>(null);

  console.log({ product });

  const handleUpdate = () => {
    startTransition(async () => {
      if (
        nameElem.current &&
        priceElem.current &&
        stockElem.current &&
        stateElem.current
      ) {
        const updated_product: Product = {
          id_pro: product.id_pro,
          product_name: nameElem.current.value,
          id_seller: product.id_seller,
          seller_username: product.seller_username,
          price: parseInt(priceElem.current.value),
          estate: stateElem.current.value[0],
          stock: parseInt(stockElem.current.value),
        };

        try {
          const res = await fetch("http://localhost:8080/products/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updated_product),
          });
          const res_text = await res.text();

          if (res.ok) {
            alert(res_text);
            setProduct();
          } else if (res.status == 409) {
            alert(res_text);
          }
        } catch (e) {
          throw new Error("Error al actualizar: " + e);
        }
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/products/delete/${product.id_pro}`,
          {
            method: "DELETE",
          }
        );
        const res_text = await res.text();
        if (res.ok) {
          setProduct();
        } else if (res.status == 409) {
          alert(res_text);
        }
      } catch (e) {
        throw new Error("Error al actualizar: " + e);
      }
    });
  };
  return (
    <>
      <form className="bg-slate-50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nombre: <span>{product.product_name}</span>
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="name"
              ref={nameElem}
              type="text"
              placeholder={product.product_name}
              defaultValue={product.product_name}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="precio"
            >
              Precio
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              name="precio"
              type="number"
              min={0}
              ref={priceElem}
              defaultValue={product.price}
            />
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="state"
            >
              Estado
            </label>
            <div className="relative">
              <select
                className={`block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded ${
                  product.estate == "A" ? "text-green-500" : "text-red-500"
                }`}
                id="grid-state"
                name="state"
                ref={stateElem}
                defaultValue={product.estate == "A" ? "Activo" : "Inactivo"}
              >
                <option className="text-green-500">Activo</option>
                <option className="text-red-500">Inactivo</option>
              </select>
              <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="grid-city"
              name="stock"
              type="number"
              ref={stockElem}
              min={0}
              defaultValue={product.stock}
            />
          </div>
        </div>
      </form>
      <div className="flex gap-5">
        <button
          className=" bg-green-500 hover:bg-green-800 transition-all cursor-pointer text-slate-100 rounded-lg w-max p-2 disabled:bg-gray-600 disabled:text-black"
          disabled={isPending}
          onClick={handleUpdate}
        >
          Actualizar
        </button>
        <button
          onClick={handleDelete}
          className=" bg-red-500 cursor-pointer hover:bg-red-800 transition-all text-slate-100 rounded-lg w-max p-2 disabled:bg-gray-600 disabled:text-black"
        >
          Eliminar
        </button>
      </div>
    </>
  );
};
