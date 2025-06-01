"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/contexts/UsersContext";
import { UserData } from "@/data/UserData";
import { Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RatingService } from "@/api/Rating";
import { useRouter } from "next/navigation";

type RatedAgent = UserData & {
  averageRating: number;
  totalRatings: number;
};

export default function TopAgents() {
  const { users } = useUsers();
  const [topAgents, setTopAgents] = useState<RatedAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRatings = async () => {
      const agents = users.filter((u) => u.role === "AGENT");
      const withRatings: RatedAgent[] = [];

      for (const agent of agents) {
        if (!agent.id) continue;
        try {
          const { average, totalRatings } = await RatingService.getAgentRatingSummary(agent.id);
          withRatings.push({ ...agent, averageRating: average, totalRatings });
        } catch {
          // Ignora erros
        }
      }

      const sorted = withRatings
        .filter((a) => a.totalRatings > 0)
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 6);

      setTopAgents(sorted);
      setLoading(false);
    };

    fetchRatings();
  }, [users]);

  return (
    <section className="py-12 px-6 w-full bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🏆 Melhores Agentes
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : topAgents.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum agente avaliado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
          {topAgents.map((agent) => (
            <Card
              key={agent.id}
              onClick={() => router.push(`/user/agentes/${agent.id}`)}
              className="p-6 flex flex-col items-center text-center bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <img
                src={agent.photo || "/profilepic.png"}
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">{agent.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{agent.email}</p>

              <div className="flex items-center gap-2 text-sm text-yellow-600 font-medium mt-2">
                <Star className="w-4 h-4 fill-yellow-400" />
                {agent.averageRating.toFixed(1)}
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Users className="w-3 h-3" />
                {agent.totalRatings} avaliação{agent.totalRatings > 1 ? "s" : ""}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
