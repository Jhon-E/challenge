import { useRef, useState, useTransition, use, SetStateAction } from "react";
import { AuthContext } from "../../../../context/AuthContextProvider";

interface Props {
  setIsView: React.Dispatch<SetStateAction<boolean>>;
}

export const FormAddUser = ({ setIsView }: Props) => {
  const nameElem = useRef<HTMLInputElement | null>(null);
  const lastNameElem = useRef<HTMLInputElement | null>(null);
  const emailElem = useRef<HTMLInputElement | null>(null);
  const passElem = useRef<HTMLInputElement | null>(null);
  const roleElem = useRef<HTMLSelectElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const authContext = use(AuthContext);

  if (!authContext) {
    throw new Error(
      "Para usar el contexto el componente debe estar envuelto en un provider"
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      console.table({
        a: nameElem.current,
        b: lastNameElem.current,
        c: passElem.current,
        d: roleElem.current,
        e: emailElem.current,
      });

      if (
        nameElem.current &&
        lastNameElem.current &&
        passElem.current &&
        roleElem.current &&
        emailElem.current
      ) {
        const new_user = {
          userName: nameElem.current.value,
          lastName: lastNameElem.current.value,
          email: emailElem.current.value,
          role: roleElem.current.value,
          password: passElem.current.value,
        };

        try {
          const res = await fetch("http://localhost:8080/users/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(new_user),
          });
          const res_text = await res.text();

          if (res.ok) {
            setIsView(false);
          } else if (res.status == 409) {
            setError(res_text);
          }
        } catch (e) {
          throw new Error("Error al actualizar: " + e);
        }
      }
    });
  };

  return (
    <div className="absolute h-dvh flex justify-center items-center top-0 left-0 w-screen bg-slate-500/10 backdrop-blur-sm">
      <div className="relative h-dvh max-w-md w-full max-h-min bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Registrar usuario
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
              Nombre
            </label>
            <input
              ref={nameElem}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              ref={lastNameElem}
              type="text"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              ref={emailElem}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
              placeholder="Ejemplo@gmail.com"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              ref={passElem}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
              placeholder="********"
              minLength={5}
              maxLength={15}
              autoComplete="off"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="rol"
            >
              Rol
            </label>
            <select
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all`}
              id="grid-rol"
              name="rol"
              ref={roleElem}
              defaultValue="Customer"
            >
              <option>Customer</option>
              <option>Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer disabled:bg-blue-950 disabled:text-blue-800 disabled:cursor-default"
            disabled={isPending}
          >
            {isPending ? "Cargando..." : "Registrar"}
          </button>
        </form>
      </div>
    </div>
  );
};
