"use client";

import React, { useState } from "react";
import { useUsers } from "@/contexts/UsersContext"; // Importa o contexto para acessar os usuários
import { UserData } from "@/data/UserData"; // Tipagem para UserData
import { useRouter } from "next/navigation"; // Para navegação
import { Search } from "lucide-react"; // Importando o ícone de lupa
import { AgentCard } from "@/components/myComponents/AgentCard";

export default function AgentsPage() {
  // Acessando os usuários do contexto
  const { users } = useUsers();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRole, setFilteredRole] = useState<string | null>(null); // Estado para armazenar a filtragem

  // Filtrando os usuários com o papel de AGENT
  const agents = users.filter(
    (user: UserData) =>
      user.role === "AGENT" &&
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filtro por nome
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!filteredRole || user.role === filteredRole) // Filtro por role, se estiver ativo
  );

  const handleCardClick = (agent: UserData) => {
    // Redireciona para a página de detalhes do agente com base no id
    router.push(`/user/agentes/${agent.id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (role: string) => {
    setFilteredRole(role);
  };

  const handleSearchClick = () => {
    // Função que será chamada quando o ícone de lupa for clicado
    console.log("Pesquisando por:", searchQuery);
    // Aqui você pode adicionar a lógica de pesquisa ou redirecionamento, caso necessário.
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 py-12">
      <h1 className="text-4xl font-bold mb-6">Fale com Agentes</h1>

      <div className="w-full max-w-7xl flex justify-end gap-4 px-8 mb-12 mt-12">
        {/* Campo de pesquisa com ícone de lupa clicável */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Pesquisar agentes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg pl-10"
          />
          <button
            onClick={handleSearchClick}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <Search size={20} />
          </button>
        </div>
      </div>


      {/* Verificando se há agentes */}
      {agents.length === 0 ? (
        <p>Nenhum agente encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
              onClick={() => handleCardClick(agent)} // Torna o card clicável
            >
              <AgentCard agent={agent} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
