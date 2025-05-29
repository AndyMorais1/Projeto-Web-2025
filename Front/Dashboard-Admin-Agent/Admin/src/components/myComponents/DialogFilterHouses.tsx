"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";
import { Filter } from "lucide-react";

export enum Type {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  PENTHOUSE = 'PENTHOUSE',
  STUDIO = 'STUDIO',
  DUPLEX = 'DUPLEX',
}

const distritosDePortugal = [
  "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
  "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Madeira",
  "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo",
  "Vila Real", "Viseu", "Açores"
];

export function DialogFilterHouses() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("");
  const [selectedAgentId, setSelectedAgentId] = React.useState<string>("");

  const { houses, setHouses, originalHouses } = useHouses();
  const { users } = useUsers();

  const agents = users.filter(user => user.role === "AGENT" && user.status === "ACTIVE");

  const handleFilter = () => {
    let filtered = originalHouses;

    if (selectedType && selectedType !== "ALL") {
      filtered = filtered.filter(house => house.type === selectedType);
    }

    if (selectedDistrict && selectedDistrict !== "ALL") {
      filtered = filtered.filter(house => house.location.city === selectedDistrict);
    }

    if (selectedAgentId && selectedAgentId !== "ALL") {
      filtered = filtered.filter(house => house.agentId === selectedAgentId);
    }

    if (filtered.length === 0) {
      toast.error("Nenhuma casa encontrada com os filtros selecionados.");
    } else {
      toast.success("Filtro aplicado com sucesso.");
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
          Filtrar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[70vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="text-lg">Filtrar Casas</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione os filtros desejados para visualizar resultados.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          {/* Tipo */}
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="type" className="text-right">Tipo</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Tipos</SelectItem>
                {Object.values(Type).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Distrito */}
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="district" className="text-right">Distrito</Label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o distrito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Distritos</SelectItem>
                {distritosDePortugal.map((distrito) => (
                  <SelectItem key={distrito} value={distrito}>
                    {distrito}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Agente */}
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="agent" className="text-right">Agente</Label>
            <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o agente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os Agentes</SelectItem>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id|| ""}>
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
