"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { HouseData } from "@/data/HouseData";
import { housesServices } from "@/api/Houses";
import { useUsers } from "@/contexts/UsersContext";

interface HousesContextType {
  houses: HouseData[];
  setHouses: React.Dispatch<React.SetStateAction<HouseData[]>>;
  originalHouses: HouseData[];
  initializeHouses: () => Promise<void>;
  refreshHouses: () => Promise<void>;
  resetHouses: () => void;
}

const HousesContext = createContext<HousesContextType>({
  houses: [],
  setHouses: () => {},
  originalHouses: [],
  initializeHouses: async () => {},
  refreshHouses: async () => {},
  resetHouses: () => {},
});

export const useHouses = () => useContext(HousesContext);

export const HousesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUsers();
  const [houses, setHouses] = useState<HouseData[]>([]);
  const [originalHouses, setOriginalHouses] = useState<HouseData[]>([]);

  const fetchHouses = async () => {
    try {
      if (!currentUser?.id) {
        console.warn("ID do usuário não está disponível ainda.");
        return;
      }

      console.log("ID do agente usado:", currentUser?.id);

      const fetchedHouses = await housesServices.getHouseByAgentId(currentUser.id);
      if (!fetchedHouses || fetchedHouses.length === 0) {
        console.warn("Nenhuma casa foi retornada.");
        return;
      }

      setHouses(fetchedHouses);
      setOriginalHouses(fetchedHouses);
    } catch (error: any) {
      console.error('Erro ao obter casas do agente:', {
        message: error.message,
        response: error.response,
        request: error.request,
        stack: error.stack,
      });
    }
  };

  const initializeHouses = async () => {
    await fetchHouses();
  };

  const refreshHouses = async () => {
    await fetchHouses();
  };

  const resetHouses = () => {
    setHouses([]);
    setOriginalHouses([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && currentUser?.id) {
      initializeHouses();
    } else if (!token) {
      console.info("Token não encontrado, não buscando casas ainda.");
    }
  }, [currentUser]);

  return (
    <HousesContext.Provider
      value={{
        houses,
        setHouses,
        originalHouses,
        initializeHouses,
        refreshHouses,
        resetHouses,
      }}
    >
      {children}
    </HousesContext.Provider>
  );
};
