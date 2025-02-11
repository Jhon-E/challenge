import LayoutAuth from "../components/LayoutAuth";
import { useNavigate, Link } from "react-router";
import { UserAuth } from "../../types/types";
import { AuthContext } from "../../context/AuthContextProvider";
import React, { useTransition, useState, useRef, use } from "react";

export const SignIn: React.FC = () => {
  const nameElem = useRef<HTMLInputElement | null>(null);
  const lastnameElem = useRef<HTMLInputElement | null>(null);
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
      if (
        nameElem.current &&
        lastnameElem.current &&
        emailElem.current &&
        passElem.current
      ) {
        const userName = nameElem.current.value;
        const lastName = lastnameElem.current.value;
        const email = emailElem.current.value;
        const password = passElem.current.value;

        const user = {
          userName,
          lastName,
          email,
          password,
          role: "Customer",
        };

        try {
          const res = await fetch("http://localhost:8080/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });

          if (res.ok) {
            const user = await res.json();
            setUser<UserAuth>(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate(user.role === "Admin" ? "/admin/dashboard" : "/home");
          } else if (res.status == 409) {
            const res_text = await res.text();
            console.log("epale", res_text);
            setError(res_text);
            nameElem.current.value = "";
            lastnameElem.current.value = "";
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
          Registrarse
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
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
              ref={lastnameElem}
              type="text"
              required
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              ref={emailElem}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="tu@email.com"
              required
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
              placeholder="••••••••"
              required
              autoComplete="current-password"
              minLength={5}
              maxLength={15}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer disabled:bg-blue-950 disabled:text-blue-800 disabled:cursor-default"
            disabled={isPending}
          >
            {isPending ? "Cargando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? inicia sesión{" "}
          <Link className="text-blue-500 font-bold" to={"/login"}>
            aquí
          </Link>
        </div>
      </div>
    </LayoutAuth>
  );
};

export default SignIn;
