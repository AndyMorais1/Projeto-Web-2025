"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CirclePlus } from "lucide-react";
import { houseTypeService } from "@/api/HouseType";
import { useHouseTypes } from "@/contexts/HouseTypesContext"; // ← IMPORTA O CONTEXT

export function DialogCreateHouseType() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState("");

    const { refreshTypes } = useHouseTypes(); // ← PEGA O MÉTODO REFRESH DO CONTEXT

    const handleSubmit = async () => {
        if (!name.trim()) {
            toast.error("O nome do tipo é obrigatório.");
            return;
        }

        try {
            const created = await houseTypeService.create({ name: name.toUpperCase() });
            if (created) {
                toast.success("Tipo de casa criado com sucesso!");
                setName("");
                setIsOpen(false);
                await refreshTypes(); // ← ATUALIZA A LISTA DE TIPOS NO CONTEXT
            } else {
                toast.error("Erro ao criar tipo de casa.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar tipo de casa.");
        }

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default">
                    <CirclePlus className="mr-2" size={16} />
                    Novo Tipo
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar Tipo de Casa</DialogTitle>
                    <DialogDescription>Informe o nome do novo tipo.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="Ex: Apartamento, Casa, Estúdio..."
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" onClick={handleSubmit}>
                        Criar
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
