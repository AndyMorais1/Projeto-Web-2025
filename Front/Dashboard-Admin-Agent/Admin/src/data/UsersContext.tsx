"use client"; 
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usersServices } from "@/api/Users"; // Importa serviço da API
import { UserData } from "@/data/UserData";

// Definindo o tipo do contexto
interface UsersContextType {
  users: UserData[];
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
}

// Criando o contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider
export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserData[]>([]);

  // Carregar usuários da API ao montar o contexto
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersServices.getAllUsers();
        console.log("🔵 Dados de usuários carregados no contexto:", data);
        setUsers(data);
      } catch (error) {
        console.error("❌ Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
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
