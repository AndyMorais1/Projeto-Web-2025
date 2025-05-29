"use client";

import React, { useState } from "react";
import { AgentCard } from "@/components/myComponents/AgentCard";
import { UserData } from "@/data/UserData";
import { useUsers } from "@/contexts/UsersContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RedePage() {
  const { users } = useUsers();
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  const agents: UserData[] = users
    .filter((user) => user.role === "AGENT")
    .filter((agent) =>
      agent.name.toLowerCase().includes(submittedSearch.toLowerCase())
    );

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
          <Button type="submit">Pesquisar</Button>
        </form>
      </div>

      {/* Grade de cards */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
