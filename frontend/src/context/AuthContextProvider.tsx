import React, { createContext, useState, ReactNode } from "react";
import { UserAuth } from "../types/types.tsx";

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const values = { user, setUser };

  return <AuthContext value={values}>{children}</AuthContext>;
};