import { User } from "../../../../types/types";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { use } from "react";

type Props = {
  users: User[];
  setUser: React.Dispatch<User>;
};
export const UsersTable = ({ users, setUser }: Props) => {

  const authContext = use(AuthContext);
  
    if (!authContext) {
      throw new Error(
        "Para usar el contexto el componente debe estar envuelto en un provider"
      );
    }
  
    const { user } = authContext;

  return (
    <div className="h-56 overflow-y-scroll rounded-lg">
      <table className="min-w-full text-center text-blue-950 bg-slate-50 shadow-md rounded-xl h-full">
        <thead>
          <tr className="bg-blue-gray-100 text-gray-700">
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Correo</th>
            <th className="py-3 px-4">Rol</th>
          </tr>
        </thead>
        <tbody className="text-blue-gray-900">
          {users?.filter(u => u.id !== user.id).map((item) => (
            <tr
              className="hover:bg-slate-300 cursor-pointer transition-all"
              key={item.id}
              onClick={() => setUser(item)}
            >
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4">{`${item.userName} ${item.lastName}`}</td>
              <td className="py-3 px-4">{item.email}</td>
              <td className="py-3 px-4">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
