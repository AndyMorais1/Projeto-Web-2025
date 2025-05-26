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
import { Filter } from "lucide-react";

// Enum dos tipos de casas
export enum Type {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  PENTHOUSE = 'PENTHOUSE',
  STUDIO = 'STUDIO',
  DUPLEX = 'DUPLEX',
}

export function DialogFilterHouses() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>("");

  const { houses, setHouses, originalHouses } = useHouses();

  const handleFilter = () => {
    if (!selectedType || selectedType === "ALL") {
      setHouses(originalHouses);
      toast.success("Filtro removido. Listando todas as casas.");
      setIsOpen(false);
      return;
    }

    const filtered = originalHouses.filter(house => house.type === selectedType);

    if (filtered.length === 0) {
      toast.error("Não há casas do tipo selecionado.");
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
          <DialogTitle className="text-lg">Filtrar Casas por Tipo</DialogTitle>
          <DialogDescription className="text-sm">
            Selecione um tipo para filtrar as casas.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <Label htmlFor="type" className="text-right">Tipo</Label>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
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
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleFilter}>Aplicar Filtro</Button>
          <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
