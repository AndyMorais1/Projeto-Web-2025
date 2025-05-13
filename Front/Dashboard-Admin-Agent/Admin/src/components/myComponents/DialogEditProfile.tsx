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
import { Pencil } from "lucide-react";
import { UserDataOptional } from "@/data/UserData";
import { usersServices } from "@/api/Users";
import { useUsers } from "@/contexts/UsersContext";
import { toast } from "sonner";

export function DialogEditProfile() {
  // Hooks devem ser sempre chamados
  const { currentUser, setCurrentUser } = useUsers();

  // Mesmo que currentUser ainda não esteja disponível, os hooks são definidos com valores padrão
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Preencher os dados do usuário quando o modal for aberto
  React.useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name ?? "");
      setEmail(currentUser.email ?? "");
    }
  }, [isOpen, currentUser]);

  const handleUpdateUser = async () => {
    if (!currentUser?.id) return;

    try {
      const updatedUser: UserDataOptional = {
        name: name || undefined,
        email: email || undefined,
      };

      const response = await usersServices.updateUser(currentUser.id, updatedUser);
      setCurrentUser(response);

      toast.success("Usuário atualizado com sucesso!");
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário", {
        description: (error as Error).message || "Tente novamente.",
      });
    }
  };

  // Só renderiza se houver currentUser
  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}  >
          <Pencil /> Editar o perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Edit your profile details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">E-mail</Label>
            <Input
              id="email"
              type="email"
              className="col-span-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpdateUser}
            disabled={!name || !email}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
