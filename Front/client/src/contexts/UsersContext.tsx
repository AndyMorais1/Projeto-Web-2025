"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usersServices } from "@/api/Users";
import { UserData } from "@/data/UserData";
import { jwtDecode } from "jwt-decode";
import { RatingService } from "@/api/Rating";
import {
  AgentRating,
  AgentRatingSummary,
} from "@/data/RatingData";

// Tipagem extendida para agentes
type AgentWithRatings = UserData & {
  ratings?: AgentRating[];
  ratingSummary?: AgentRatingSummary;
};

interface UsersContextType {
  users: UserData[];
  currentUser: UserData | AgentWithRatings | null;
  setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<UserData | AgentWithRatings | null>
  >;
  initializeUsersData: () => Promise<void>;
  resetUsers: () => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | AgentWithRatings | null>(null);

  const initializeUsersData = async () => {
    try {
      const allUsers = await usersServices.getAllUsers();
      setUsers(allUsers);

      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<{ id: string; exp: number }>(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) return resetUsers();

        const user = await usersServices.getUserById(decoded.id);

        if (user.role === "AGENT") {
          const [ratingSummary, ratings] = await Promise.all([
            RatingService.getAgentRatingSummary(user.id!),
            RatingService.getRatingsForAgent(user.id!),
          ]);
          const extendedUser: AgentWithRatings = {
            ...user,
            ratingSummary,
            ratings,
          };
          setCurrentUser(extendedUser);
        } else {
          setCurrentUser(user);
        }
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
    const token = localStorage.getItem("token");
    if (token) {
      initializeUsersData();
    }
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

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
