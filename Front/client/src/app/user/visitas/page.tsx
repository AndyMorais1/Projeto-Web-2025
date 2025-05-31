"use client";

import { useEffect, useState } from "react";
import { useVisits } from "@/contexts/VisitsContext";
import { useUsers } from "@/contexts/UsersContext";
import { VisitData } from "@/data/VisitsData";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VisitsPage() {
  const { currentUser } = useUsers();
  const { getVisitsByClient } = useVisits();

  const [visits, setVisits] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVisits = async () => {
      if (!currentUser?.id) return;
      setLoading(true);
      const result = await getVisitsByClient(currentUser.id);
      setVisits(result || []);
      setLoading(false);
    };

    loadVisits();
  }, [currentUser]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Minhas Visitas</h1>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-gray-500">
          <Loader2 className="animate-spin mr-2" />
          Carregando visitas...
        </div>
      ) : visits.length === 0 ? (
        <div className="text-center text-gray-600">
          Você ainda não solicitou nenhuma visita.
        </div>
      ) : (
        <div className="grid gap-4">
          {visits.map((visit) => (
            <Card key={visit.id} className="shadow-sm border border-gray-200">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {visit.house.title}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      visit.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : visit.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {visit.status === "CONFIRMED"
                      ? "Confirmada"
                      : visit.status === "REJECTED"
                      ? "Rejeitada"
                      : "Pendente"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Data:</strong>{" "}
                  {format(new Date(visit.date), "dd 'de' MMMM yyyy 'às' HH:mm", {
                    locale: pt,
                  })}
                </p>
                {visit.message && (
                  <p className="text-sm text-gray-700">
                    <strong>Mensagem:</strong> {visit.message}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
