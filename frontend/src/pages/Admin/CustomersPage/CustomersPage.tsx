import { useEffect, useTransition, useState } from "react";
import { createPortal } from "react-dom";
import { UsersTable } from "./components/UsersTable";
import { User } from "../../../types/types";
import { DetailsUser } from "./components/DetailsUser";
import { FormAddUser } from "./components/FormAddUser";

const CustomersPage = () => {
  const [users, setUsers] = useState<User[]>();
  const [selectUser, setSelectUser] = useState<User>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<String>();
  const [isPending, startTransition] = useTransition();

  const getUsers = () => {
    startTransition(async () => {
      try {
        const res = await fetch("http://localhost:8080/users");
        if (res.ok) {
          const listOfUsers = await res.json();
          setUsers(listOfUsers);
        } else if (res.status === 402) {
          const res_text = await res.text();
          setError(res_text);
        }
      } catch (e) {
        throw new Error("Error al obtener productos: " + e);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, [showModal, selectUser]);

  return (
    <>
      <div className="rounded-lg w-full h-full flex flex-col">
        <h2 className="text-slate-50 text-4xl font-semibold p-4 self-end">
          Usuarios
        </h2>
        <div className="bg-gradient-to-r from-blue-200 to-blue-800 h-px"></div>
        <div className="text-right my-2 flex gap-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer transition-all"
          >
            Agregar usuario
          </button>
          <button
            className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
            onClick={() => getUsers()}
          >
            Refrescar
          </button>
        </div>
        {isPending ? (
          <div className="w-full flex items-center justify-center min-h-56 text-center text-blue-950 bg-slate-50 shadow-md rounded-xl">
            <p>Cargando....</p>
          </div>
        ) : !error ? (
          <UsersTable users={users ? users : []} setUser={setSelectUser} />
        ) : (
          <p className="text-red-500">{error}</p>
        )}
        {selectUser && (
          <DetailsUser user={selectUser} setUser={setSelectUser} />
        )}
      </div>
      {showModal &&
        createPortal(<FormAddUser setIsView={setShowModal} />, document.body)}
    </>
  );
};

export default CustomersPage;

/* {selectUser && (
          <DetailsUser
            product={selectUser}
            setProduct={setSelectUser}
          />
        )} 
          
        {showModal &&
        createPortal(
          <FormAddUser setIsView={setShowModal} />,
          document.body
        )}*/
