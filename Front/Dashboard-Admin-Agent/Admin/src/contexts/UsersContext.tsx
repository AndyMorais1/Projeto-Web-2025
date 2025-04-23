"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usersServices } from "@/api/Users"; // Importa serviço da API
import { UserData } from "@/data/UserData";
import { jwtDecode } from "jwt-decode";

// Definindo o tipo do contexto
interface UsersContextType {
  users: UserData[];
  currentUser: UserData | null;  // Adicionamos o usuário atual ao contexto
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;  // Função para atualizar o usuário atual
}

// Criando o contexto
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider
export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // Carregar usuários da API e o usuário atual ao montar o contexto
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Primeiro, buscamos o usuário atual do token
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const decoded = jwtDecode<Omit<UserData, "password">>(token); // Decodificamos o token para obter os dados do usuário atual
            setCurrentUser(decoded); // Atualizamos o estado com o usuário atual
          } catch (err) {
            console.error("Erro ao decodificar o token:", err);
          }
        }

        // Agora, carregamos a lista de usuários da API
        const data = await usersServices.getAllUsers();
        console.log(" Dados de usuários carregados no contexto:", data);
        setUsers(data);
      } catch (error) {
        console.error(" Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, currentUser, setUsers, setCurrentUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// Hook customizado para acessar o contexto
export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
