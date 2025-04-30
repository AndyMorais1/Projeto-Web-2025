"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { UserData } from "@/data/UserData";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext"; // Importando o contexto de casas
import { HouseData } from "@/data/HouseData";
import { Filter } from "lucide-react";  // Importando o ícone de filtro

export function DialogFilterHouses({
  onFilter,
}: {
  onFilter: (filteredHouses: HouseData[]) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAgentId, setSelectedAgentId] = React.useState<string>("");

  const { users } = useUsers(); // Pegando os usuários do contexto
  const { houses, refreshHouses } = useHouses(); // Pegando as casas do contexto
  const [agents, setAgents] = React.useState<UserData[]>([]);

  // Filtra os usuários para pegar somente os que são agentes
  React.useEffect(() => {
    const filteredAgents = users.filter(user => user.role === "AGENT");
    setAgents(filteredAgents);
  }, [users]);

  // Função para filtrar as casas com base no ID do agente selecionado
  const handleFilter = () => {
    if (!selectedAgentId) {
      toast.error("Selecione um agente para filtrar.");
      return;
    }

    // Verifique se o selectedAgentId está correto (por exemplo, se não está vazio)
    console.log("Filtrando casas para o agente com ID:", selectedAgentId);

    // Filtra as casas do contexto de acordo com o ID do agente
    const filteredHouses = houses.filter(house => house.agentId === selectedAgentId);
    if (filteredHouses.length === 0) {
      toast.error("Não há casas para o agente selecionado.");
    }

    // Passa as casas filtradas para o componente pai
    onFilter(filteredHouses);  
    setIsOpen(false);  // Fecha o modal
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" >
          <Filter className="mr-2" size={18} /> {/* Ícone de filtro */}
          Filter {/* Palavra "Filter" */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[70vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="text-lg">Filter Houses by Agent</DialogTitle>
          <DialogDescription className="text-sm">
            Select an agent to filter the houses.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {/* Seletor de Agente Responsável */}
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="agentId" className="text-right">Agent</Label>
            <Select
              value={selectedAgentId}
              onValueChange={setSelectedAgentId || ""}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id || ""}>
                    {agent.name} {/* Exibe o nome do agente */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleFilter}>Apply Filter</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
