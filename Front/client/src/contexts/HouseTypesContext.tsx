"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { HouseType } from "@/data/HouseData";
import { houseTypeService } from "@/api/HouseType";

interface HouseTypesContextType {
  types: HouseType[];
  refreshTypes: () => Promise<void>;
}

const HouseTypesContext = createContext<HouseTypesContextType>({
  types: [],
  refreshTypes: async () => {},
});

export const useHouseTypes = () => useContext(HouseTypesContext);

export const HouseTypesProvider = ({ children }: { children: React.ReactNode }) => {
  const [types, setTypes] = useState<HouseType[]>([]);

  const refreshTypes = async () => {
    try {
      const fetched = await houseTypeService.getAll();
      setTypes(fetched);
    } catch (error) {
      console.error("Erro ao buscar tipos de casa:", error);
    }
  };

  useEffect(() => {
    refreshTypes();
  }, []);

  return (
    <HouseTypesContext.Provider value={{ types, refreshTypes }}>
      {children}
    </HouseTypesContext.Provider>
  );
};
