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
import { uploadImage } from "@/utils/uploadImage"; // 👈 Importa a função de upload

export function DialogEditProfile() {
  const { currentUser, setCurrentUser } = useUsers();

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null); // 👈 Novo estado para imagem
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name ?? "");
      setEmail(currentUser.email ?? "");
      setImage(null); // Limpa a imagem ao abrir
    }
  }, [isOpen, currentUser]);

const handleUpdateUser = async () => {
  if (!currentUser?.id) return;

  try {
    let photoUrl = currentUser.photo; // Se não houver nova foto, mantém a antiga

    // Se uma nova imagem foi escolhida
    if (image) {
      photoUrl = await uploadImage(image); // Aqui você sobe a imagem e recebe a URL
    }

    const updatedUser: UserDataOptional = {
      name,
      email,
      photo: photoUrl, // A URL da foto que será atualizada
    };

    const response = await usersServices.updateUser(currentUser.id, updatedUser);
    setCurrentUser(response); // Atualiza o estado local com os dados novos

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
          <Pencil /> Editar o perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Edit your profile details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Nome */}
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

          {/* Email */}
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

          {/* Imagem */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">Profile Image</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              className="col-span-3"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
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
