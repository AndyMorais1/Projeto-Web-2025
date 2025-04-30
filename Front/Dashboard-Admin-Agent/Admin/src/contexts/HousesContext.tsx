"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { HouseData } from "@/data/HouseData";
import { housesServices } from "@/api/Houses";

interface HousesContextType {
  houses: HouseData[];
  setHouses: React.Dispatch<React.SetStateAction<HouseData[]>>;
  initializeHouses: () => Promise<void>;
  refreshHouses: () => Promise<void>;
}

const HousesContext = createContext<HousesContextType>({
  houses: [],
  setHouses: () => {},
  initializeHouses: async () => {},
  refreshHouses: async () => {},
});

export const useHouses = () => useContext(HousesContext);

export const HousesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [houses, setHouses] = useState<HouseData[]>([]);

  const fetchHouses = async () => {
    try {
      const fetchedHouses = await housesServices.getAllHouses();
      if (!fetchedHouses) {
        console.error("Erro ao buscar casas");
        return;
      }
      setHouses(fetchedHouses);
    } catch (error) {
      console.error("Erro ao buscar casas:", error);
    }
  };

  const initializeHouses = async () => {
    await fetchHouses();
  };

  const refreshHouses = async () => {
    await fetchHouses();
  };

  useEffect(() => {
    initializeHouses();
  }, []);

  return (
    <HousesContext.Provider
      value={{ houses, setHouses, initializeHouses, refreshHouses }}
    >
      {children}
    </HousesContext.Provider>
  );
};
