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
  selectedHouse: HouseData | null;
  setSelectedHouse: React.Dispatch<React.SetStateAction<HouseData | null>>;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  favorites: HouseData[];
  toggleFavorite: (house: HouseData) => void;
  selectedDistrict: string | null;
  setSelectedDistrict: React.Dispatch<React.SetStateAction<string | null>>;
}

const HousesContext = createContext<HousesContextType>({
  houses: [],
  setHouses: () => { },
  originalHouses: [],
  initializeHouses: async () => { },
  refreshHouses: async () => { },
  resetHouses: () => { },
  selectedHouse: null,
  setSelectedHouse: () => { },
  isDialogOpen: false,
  setIsDialogOpen: () => { },
  favorites: [],
  toggleFavorite: () => { },
  selectedDistrict: null,
  setSelectedDistrict: () => { }
});

export const useHouses = () => useContext(HousesContext);

export const HousesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUsers();

  const [houses, setHouses] = useState<HouseData[]>([]);
  const [originalHouses, setOriginalHouses] = useState<HouseData[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<HouseData[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const fetchHouses = async () => {
    try {
      const fetchedHouses = await housesServices.getAllHouses(); // ❌ sem depender de currentUser
      setHouses(fetchedHouses);
      setOriginalHouses(fetchedHouses);
    } catch (error: any) {
      console.error("Erro ao obter casas:", {
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

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !currentUser?.id) return;

      const res = await fetch("http://localhost:3000/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Erro ao carregar favoritos do servidor:", err);
    }
  };

  const toggleFavorite = async (house: HouseData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !currentUser?.id) return;

      await fetch("http://localhost:3000/users/favorites/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ houseId: house.id }),
      });

      // Recarrega favoritos do servidor após qualquer mudança
      await loadFavorites();
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !currentUser?.id) return;

    initializeHouses();
    loadFavorites();
  }, [currentUser?.id]);

  return (
    <HousesContext.Provider
      value={{
        houses,
        setHouses,
        originalHouses,
        initializeHouses,
        refreshHouses,
        resetHouses,
        selectedHouse,
        setSelectedHouse,
        isDialogOpen,
        setIsDialogOpen,
        favorites,
        toggleFavorite,
        selectedDistrict,
        setSelectedDistrict,
      }}
    >
      {children}
    </HousesContext.Provider>
  );
};
