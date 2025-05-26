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
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";
import { Filter } from "lucide-react";

export function DialogFilterHouses() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedAgentId, setSelectedAgentId] = React.useState<string>("");

  const { users } = useUsers();
  const { houses, setHouses, originalHouses } = useHouses();

  const handleFilter = () => {
    if (!selectedAgentId || selectedAgentId === "ALL") {
      // Restaurar todas as casas
      setHouses(originalHouses);
      toast.success("Filtro removido. Listando todas as casas.");
      setIsOpen(false);
      return;
    }

    const filtered = originalHouses.filter(house => house.agentId === selectedAgentId);

    if (filtered.length === 0) {
      toast.error("Não há casas para o agente selecionado.");
    }

    setHouses(filtered);
    setIsOpen(false);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2" size={18} />
<<<<<<< HEAD
          Filter
=======
          Filtrar
>>>>>>> main
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[70vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="text-lg">Filtrar Casas por Agente</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione um agente para filtrar as casas.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="agentId" className="text-right">Agente</Label>
            <Select
              value={selectedAgentId}
              onValueChange={setSelectedAgentId}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o agente" />
              </SelectTrigger>
              <SelectContent>
<<<<<<< HEAD
                <SelectItem value="ALL">All Agents</SelectItem>
                {users
                  .filter(user => user.role === "AGENT" && user.id && originalHouses.some(h => h.agentId === user.id)&& user.status === "ACTIVE")
                  .map(agent => (
                    <SelectItem key={agent.id} value={agent.id|| ""}>
=======
                <SelectItem value="ALL">Todos os Agentes</SelectItem>
                {users
                  .filter(user => user.role === "AGENT" && user.id && originalHouses.some(h => h.agentId === user.id))
                  .map(agent => (
                    <SelectItem key={agent.id} value={agent.id || ""}>
>>>>>>> main
                      {agent.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleFilter}>Aplicar Filtro</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
