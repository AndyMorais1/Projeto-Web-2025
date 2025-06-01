"use client";

import React, { useEffect, useState } from "react";
import { AgentCard } from "@/components/myComponents/AgentCard";
import { UserData } from "@/data/UserData";
import { useUsers } from "@/contexts/UsersContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export default function RedePage() {
  const { users } = useUsers();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const [search, setSearch] = useState(initialQuery);

  const agents: UserData[] = users
    .filter((user) => user.role === "AGENT"&& user.status === "ACTIVE")
    .filter((agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/user/rede?${params.toString()}`);
  };

  useEffect(() => {
    setSearch(initialQuery); // Atualiza o campo quando muda a URL (ex: navegação)
  }, [initialQuery]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="px-6 py-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold">Rede</h1>
      </div>

      {/* Barra de pesquisa */}
      <div className="px-6 py-4 flex justify-end">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-sm w-full">
          <Input
            type="text"
            placeholder="Pesquisar agente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
        </form>
      </div>

      {/* Grade de cards */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {agents.length > 0 ? (
          agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
        ) : (
          <p className="col-span-2 text-center text-gray-500">Nenhum agente encontrado.</p>
        )}
      </div>
    </div>
  );
}
