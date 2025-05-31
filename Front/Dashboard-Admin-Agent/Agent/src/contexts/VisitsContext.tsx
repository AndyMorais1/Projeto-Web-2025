"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  VisitData,
  VisitCreatePayload,
  VisitUpdateStatusPayload,
} from "@/data/VisitsData";
import { visitsService } from "@/api/Visits";

interface VisitsContextType {
  visits: VisitData[];
  isLoading: boolean;
  getVisitsByClient: (clientId: string) => Promise<VisitData[]>;
  getVisitsByAgent: (agentId: string) => Promise<VisitData[]>;
  createVisit: (data: VisitCreatePayload) => Promise<VisitData | null>;
  updateVisitStatus: (data: VisitUpdateStatusPayload) => Promise<boolean>;
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
      console.error("Erro ao buscar visitas do cliente:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getVisitsByAgent = async (agentId: string): Promise<VisitData[]> => {
    setIsLoading(true);
    try {
      const result = await visitsService.getVisitsByAgent(agentId);
      setVisits(result);
      return result;
    } catch (error) {
      console.error("Erro ao buscar visitas do agente:", error);
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

  const updateVisitStatus = async (
    data: VisitUpdateStatusPayload
  ): Promise<boolean> => {
    try {
      const updated = await visitsService.updateVisitStatus(data);
      if (updated) {
        setVisits((prev) =>
          prev.map((v) =>
            v.id === data.visitId ? { ...v, status: data.status } : v
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Erro ao atualizar status da visita:", error);
      return false;
    }
  };

  return (
    <VisitsContext.Provider
      value={{
        visits,
        isLoading,
        getVisitsByClient,
        getVisitsByAgent,
        createVisit,
        updateVisitStatus,
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
