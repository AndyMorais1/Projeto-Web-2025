"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/contexts/UsersContext";
import { useVisits } from "@/contexts/VisitsContext";
import { VisitData } from "@/data/VisitsData";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MyVisits() {
  const { currentUser } = useUsers();
  const {
    getVisitsByAgent,
    updateVisitStatus,
    visits,
    isLoading,
  } = useVisits();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisits = async () => {
      if (!currentUser?.id) return;
      setLoading(true);
      await getVisitsByAgent(currentUser.id);
      setLoading(false);
    };

    loadVisits();
  }, [currentUser]);

  const handleUpdateStatus = async (visitId: string, status: "CONFIRMED" | "REJECTED") => {
    const success = await updateVisitStatus({ visitId, status });
    if (success) {
      toast.success(`Visita ${status === "CONFIRMED" ? "confirmada" : "rejeitada"} com sucesso`);
    } else {
      toast.error("Erro ao atualizar o status da visita.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-auto bg-gray-50">
      <div className="px-6 py-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold text-gray-800">Minhas Visitas</h1>
      </div>

      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Carregando visitas...</p>
        ) : visits.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma visita solicitada nas suas casas.</p>
        ) : (
          visits.map((visit) => (
            <Card key={visit.id}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {visit.house.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Solicitada por: <strong>{visit.client.name}</strong> ({visit.client.email})
                    </p>
                    <p className="text-sm text-gray-600">
                      Data:{" "}
                      {format(new Date(visit.date), "dd 'de' MMMM yyyy 'às' HH:mm", {
                        locale: pt,
                      })}
                    </p>
                    {visit.message && (
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Mensagem:</strong> {visit.message}
                      </p>
                    )}
                  </div>

                  {visit.status === "PENDING" && (
                    <div className="flex flex-col gap-2 min-w-[140px] items-end">
                      <Button
                        onClick={() => handleUpdateStatus(visit.id, "CONFIRMED")}
                        className="w-full"
                      >
                        Aceitar
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleUpdateStatus(visit.id, "REJECTED")}
                        className="w-full"
                      >
                        Recusar
                      </Button>
                    </div>
                  )}

                  {visit.status !== "PENDING" && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        visit.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {visit.status === "CONFIRMED" ? "Confirmada" : "Rejeitada"}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
