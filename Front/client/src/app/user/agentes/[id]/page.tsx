// app/agents/[id].tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importando a navegação do Next.js
import { useUsers } from "@/contexts/UsersContext"; // Para acessar o contexto
import { useParams } from "next/navigation"; // Para pegar o id do agente via URL

export default function AgentDetails() {
  const { users } = useUsers();
  const [agent, setAgent] = useState<any>(null);
  const { id } = useParams(); // Pega o parâmetro 'id' da URL

  useEffect(() => {
    // Encontre o agente correspondente ao id
    const foundAgent = users.find((user) => user.id === id);
    setAgent(foundAgent);
  }, [id, users]);

  if (!agent) return <div>Carregando detalhes do agente...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Detalhes do Agente</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <img
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-2 border-blue-600"
          src={agent.photo || "/default-avatar.jpg"}
          alt={agent.name}
        />
        <h2 className="text-2xl font-semibold">{agent.name}</h2>
        <p className="text-gray-700">{agent.email}</p>
        <p className="text-gray-500 mt-2">Role: {agent.role}</p>
        <div className="mt-4">
          <p className="font-semibold">Bio:</p>
          <p>{agent.bio || "Sem bio disponível."}</p>
        </div>
      </div>
    </div>
  );
}
