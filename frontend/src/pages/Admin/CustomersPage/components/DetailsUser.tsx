import React, { useRef, useTransition } from "react";
import { User } from "../../../../types/types";
type Props = {
  user: User;
  setUser: React.Dispatch<User>;
};
export const DetailsUser = ({ user, setUser }: Props) => {
  const [isPending, startTransition] = useTransition();

  const nameElem = useRef<HTMLInputElement | null>(null);
  const lastNameElem = useRef<HTMLInputElement | null>(null);
  const roleElem = useRef<HTMLSelectElement | null>(null);

  const handleUpdate = () => {
    startTransition(async () => {
      if (nameElem.current && lastNameElem.current && roleElem.current) {
        const updated_user: User = {
          id: user.id,
          userName: nameElem.current.value,
          lastName: lastNameElem.current.value,
          email: user.email,
          role: roleElem.current.value,
        };

        try {
          const res = await fetch("http://localhost:8080/users/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updated_user),
          });
          const res_text = await res.text();

          if (res.ok) {
            alert(res_text);
            setUser();
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
          `http://localhost:8080/users/delete/${user.id}`,
          {
            method: "DELETE",
          }
        );
        const res_text = await res.text();
        if (res.ok) {
          setUser();
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
      <form className="bg-slate-50 w-1/2 shadow-md rounded-lg p-4 flex flex-col my-2">
        <div className="md:flex mb-6">
          <div className=" w-full">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="name"
            >
              {`${user.userName} ${user.lastName}`}
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              ref={nameElem}
              defaultValue={user.userName}
              type="text"
              placeholder="Nuevo nombre"
            />
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              ref={lastNameElem}
              defaultValue={user.lastName}
              type="text"
              placeholder="Nuevo apellido"
            />
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="rol"
            >
              Rol
            </label>
            <div className="relative">
              <select
                className={`block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded`}
                name="rol"
                ref={roleElem}
                defaultValue="Customer"
              >
                <option >Customer</option>
                <option>Admin</option>
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
        </div>
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
            disabled={isPending}
            className=" bg-red-500 cursor-pointer hover:bg-red-800 transition-all text-slate-100 rounded-lg w-max p-2 disabled:bg-gray-600 disabled:text-black"
          >
            Eliminar
          </button>
        </div>
      </form>
    </>
  );
};
