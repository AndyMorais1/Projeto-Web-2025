"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { VisitData, VisitCreatePayload } from "@/data/VisitsData";
import { visitsService } from "@/api/Visits";

interface VisitsContextType {
  visits: VisitData[];
  isLoading: boolean;
  getVisitsByClient: (clientId: string) => Promise<VisitData[]>;
  createVisit: (data: VisitCreatePayload) => Promise<VisitData | null>;
}

const VisitsContext = createContext<VisitsContextType | undefined>(undefined);

export const VisitsProvider = ({ children }: { children: ReactNode }) => {
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVisitsByClient = async (clientId: string): Promise<VisitData[]> => {
    setIsLoading(true);
    try {
      const result = await visitsService.getVisitsByClient(clientId);
      setVisits(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar visitas:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const createVisit = async (data: VisitCreatePayload): Promise<VisitData | null> => {
    try {
      const newVisit = await visitsService.createVisit(data);
      if (newVisit) setVisits((prev) => [...prev, newVisit]);
      return newVisit;
    } catch (error) {
      console.error("Erro ao criar visita:", error);
      return null;
    }
  };

  return (
    <VisitsContext.Provider
      value={{
        visits,
        isLoading,
        getVisitsByClient, // 👈 nome mais consistente
        createVisit,
      }}
    >
      {children}
    </VisitsContext.Provider>
  );
};

export const useVisits = (): VisitsContextType => {
  const context = useContext(VisitsContext);
  if (!context) {
    throw new Error("useVisits deve ser usado dentro de VisitsProvider");
  }
  return context;
};
