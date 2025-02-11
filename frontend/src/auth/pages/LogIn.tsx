import LayoutAuth from "../components/LayoutAuth.tsx";
import React, { useRef, useState, useTransition, use } from "react";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/AuthContextProvider.tsx";

const LogIn = () => {
  const emailElem = useRef<HTMLInputElement | null>(null);
  const passElem = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<any>();
  const [isPending, startTransition] = useTransition();

  const authContext = use(AuthContext);

  if (!authContext) {
    throw new Error(
      "Para usar el contexto el componente debe estar envuelto en un provider"
    );
  }

  const { setUser } = authContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      if (emailElem.current && passElem.current) {
        const email = emailElem.current.value;
        const password = passElem.current.value;

        const user = {
          email,
          password,
        };

        try {
          const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (res.ok) {
            const user = await res.json();
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(user && user.role === "Admin" ? "/admin/dashboard" : "/home");
          } else if (res.status == 409) {
            const res_text = await res.text();
            console.log({ res_text });

            setError(res_text);
            emailElem.current.value = "";
            passElem.current.value = "";
          } else {
            console.error(
              "Error en la respuesta del servidor:",
              res.statusText
            );
          }
        } catch (e) {
          console.error("Error al registrar usuario:", e);
        }
      } else {
        console.error("Todos los campos son obligatorios.");
      }
    });
  };
  return (
    <LayoutAuth>
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Iniciar sesión
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              ref={emailElem}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="tu@email.com"
              autoComplete="off"
              required
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
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer disabled:bg-blue-950 disabled:text-blue-800 disabled:cursor-default"
            disabled={isPending}
          >
            {isPending ? "Cargando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta? registrate{" "}
          <Link className="text-blue-500 font-bold" to={"/signin"}>
            aquí
          </Link>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default LogIn;

/* 

 */
