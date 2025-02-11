import { Link } from "react-router";

export default function RouteWithNotFound() {
  return (
    <>
      <main className="grid h-full place-items-center px-6 py-24">
        <div className="text-center">
          <p className="font-semibold text-indigo-600 text-4xl">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Página no encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Disculpa, esta página no existe 🤔.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to={"/home"} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Regresa al home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
