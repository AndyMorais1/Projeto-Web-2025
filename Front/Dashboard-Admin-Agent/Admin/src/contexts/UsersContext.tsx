"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usersServices } from "@/api/Users";
import { UserData } from "@/data/UserData";
import { jwtDecode } from "jwt-decode";

// Tipagem do contexto
interface UsersContextType {
  users: UserData[];
  currentUser: UserData | null;
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  initializeUsersData: () => Promise<void>;
  resetUsers: () => void;
}

// Criando o contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider
export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const initializeUsersData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode<Omit<UserData, "password">>(token);
          setCurrentUser(decoded);
        } catch (err) {
          console.error("Erro ao decodificar o token:", err);
        }

        const data = await usersServices.getAllUsers();
        console.log("Usuários carregados após login:", data);
        setUsers(data);
      } else {
        console.log("Token não encontrado no localStorage.");
      }
    } catch (error) {
      console.error("Erro ao inicializar dados dos usuários:", error);
    }
  };

  const resetUsers = () => {
    setUsers([]);
    setCurrentUser(null);
  };

  useEffect(() => {
    initializeUsersData();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        currentUser,
        setUsers,
        setCurrentUser,
        initializeUsersData,
        resetUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

// Hook customizado
export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
