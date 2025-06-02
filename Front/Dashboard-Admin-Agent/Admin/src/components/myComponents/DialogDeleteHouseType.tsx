"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { houseTypeService } from "@/api/HouseType";
import { HouseType } from "@/data/HouseData";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useUsers } from "@/contexts/UsersContext";

interface Props {
  onDeleted: (id: string) => void;
}

export function DialogDeleteHouseType({ onDeleted }: Props) {
  const { currentUser } = useUsers();
  const [isOpen, setIsOpen] = useState(false);
  const [houseTypes, setHouseTypes] = useState<HouseType[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      houseTypeService.getAll().then(setHouseTypes);
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (!selectedId) {
      toast.warning("Selecione um tipo de imóvel");
      return;
    }

    try {
      setLoading(true);
      await houseTypeService.delete(selectedId);
      const deleted = houseTypes.find((type) => type.id === selectedId);
      toast.success(`Tipo "${deleted?.name}" removido com sucesso`);
      onDeleted(selectedId);
      setSelectedId("");
      setIsOpen(false);
    } catch (error: any) {
      console.error("Erro ao deletar tipo de casa:", error);
      toast.error("Erro ao remover tipo de imóvel.", {
        description:
          error?.response?.data?.message || "Erro interno ao excluir.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser?.isSuperAdmin) {
    return null; // botão e dialogo não visíveis para não-superadmins
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2 w-4 h-4" />
          Remover Tipo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Tipo de Imóvel</DialogTitle>
          <DialogDescription>
            Selecione um tipo de imóvel para excluí-lo permanentemente.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {houseTypes.length > 0 ? (
                houseTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Nenhum tipo de imóvel encontrado.
                </div>
              )}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-red-500">
          Atenção: essa ação é irreversível. Todos os imóveis associados a este
          tipo serão removidos.
        </p>

        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!selectedId || loading}
          >
            {loading ? "Removendo..." : "Remover"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
