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
import { uploadImage } from "@/utils/uploadImage";

export function DialogEditProfile() {
  const { currentUser, setCurrentUser, initializeUsersData } = useUsers();

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name ?? "");
      setEmail(currentUser.email ?? "");
      setImage(null);
      setCurrentPassword("");
      setNewPassword("");
    }
  }, [isOpen, currentUser]);

  const handleUpdateUser = async () => {
    if (!currentUser?.id) return;

    try {
      let photoUrl = currentUser.photo;

      if (image) {
        photoUrl = await uploadImage(image);
      }

      const updatedUser: UserDataOptional = {
        name,
        email,
        photo: photoUrl,
        ...(currentPassword && newPassword
          ? { currentPassword, newPassword }
          : {}),
      };

      const response = await usersServices.updateUser(currentUser.id, updatedUser);

      setCurrentUser(response); // resposta rápida
      await initializeUsersData(); // dados consistentes

      toast.success("Usuário atualizado com sucesso!");
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário", {
        description: (error as Error).message || "Tente novamente.",
      });
    }
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Pencil className="mr-2 h-4 w-4" /> Editar o perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Atualize suas informações e senha.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Nome</Label>
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

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">Imagem</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="col-span-3"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentPassword" className="text-right">Senha atual</Label>
            <Input
              id="currentPassword"
              type="password"
              className="col-span-3"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword" className="text-right">Nova senha</Label>
            <Input
              id="newPassword"
              type="password"
              className="col-span-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleUpdateUser} disabled={!name || !email}>
            Salvar
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
