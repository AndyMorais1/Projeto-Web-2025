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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { UserDataOptional, UserData } from "@/data/UserData";
import { usersServices } from "@/api/Users";
import { toast } from "sonner";
import { uploadImage } from "@/utils/uploadImage";

interface DialogEditUserProps {
  user: UserDataOptional;
  onUserUpdated: (updatedUser: UserData) => void;
  disabled?: boolean;
}

export function DialogEditUser({
  user,
  onUserUpdated,
  disabled = false,
}: DialogEditUserProps) {
  const [role, setRole] = React.useState<string>(user.role ?? "CLIENT");
  const [name, setName] = React.useState<string>(user.name ?? "");
  const [email, setEmail] = React.useState<string>(user.email ?? "");
  const [phone, setPhone] = React.useState<string>(user.phone ?? "");
  const [status, setStatus] = React.useState<string>(user.status ?? "PENDING");
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(user.isSuperAdmin ?? false);
  const [image, setImage] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpen = (open: boolean) => {
    if (open) {
      setRole(user.role ?? "CLIENT");
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setStatus(user.status ?? "PENDING");
      setIsSuperAdmin(user.isSuperAdmin ?? false);
    }
    setIsOpen(open);
  };

  const handleUpdateUser = async () => {
    try {
      if (!user.id) {
        console.error("Erro: ID do usuário não encontrado");
        return;
      }

      let photoUrl: string | undefined = user.photo;
      if (image) {
        photoUrl = await uploadImage(image);
      }

      const updatedUser: UserDataOptional = {
        role,
        name,
        email,
        phone,
        status,
        photo: photoUrl,
        isSuperAdmin,
      };

      const response = await usersServices.updateUser(user.id, updatedUser);

      onUserUpdated(response);
      toast.success("Usuário atualizado com sucesso!", { duration: 3000 });
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário", {
        description: (error as Error).message || "Tente novamente.",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => !disabled && setIsOpen(true)}
          variant="outline"
          size="icon"
          disabled={disabled}
          title={disabled ? "Você não tem permissão para editar este usuário" : ""}
        >
          <Pencil className="text-blue-600" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>Edite os dados do usuário abaixo.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Role */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Tipo</Label>
            <Select onValueChange={setRole} value={role} disabled={disabled}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Cliente</SelectItem>
                <SelectItem value="AGENT">Agente</SelectItem>
                <SelectItem value="ADMIN" disabled>Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Superadmin (visível somente para admins) */}
          {role === "ADMIN" && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isSuperAdmin"
                checked={isSuperAdmin}
                onChange={(e) => setIsSuperAdmin(e.target.checked)}
                disabled={disabled}
              />
              <Label htmlFor="isSuperAdmin">Superadmin</Label>
            </div>
          )}

          {/* Status */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus} value={status} disabled={disabled}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Formulário */}
          <form>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={disabled}
                />
              </div>

              {(role === "CLIENT" || role === "AGENT") && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={disabled}
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Telefone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="col-span-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={disabled}
                    />
                  </div>
                </>
              )}

              {/* Imagem */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Foto de Perfil
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  disabled={disabled}
                />
              </div>

              {/* Pré-visualizações */}
              {user.photo && (
                <div className="flex justify-center">
                  <img
                    src={user.photo}
                    alt="Foto atual"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}

              {image && (
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Nova imagem"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpdateUser}
            disabled={!role || !name || disabled}
          >
            Salvar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
