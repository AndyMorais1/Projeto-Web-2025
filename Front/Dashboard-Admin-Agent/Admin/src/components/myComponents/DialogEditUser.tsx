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
import { useUsers } from "@/contexts/UsersContext";
import { toast } from "sonner"; 

export function DialogEditUser({
  user,
  onUserUpdated,
}: {
  user: UserDataOptional;
  onUserUpdated: (updatedUser: UserData) => void;
}) {
  // Estados para armazenar dados do usuário
  const [role, setRole] = React.useState<string>(user.role ?? "CLIENT");
  const [name, setName] = React.useState<string>(user.name ?? "");
  const [email, setEmail] = React.useState<string>(user.email ?? "");
  const [phone, setPhone] = React.useState<string>(user.phone ?? "");
  const [status, setStatus] = React.useState<string>(user.status ?? "PENDING");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Atualiza os estados quando o modal é aberto
  const handleOpen = (open: boolean) => {
    if (open) {
      // Quando o modal é aberto, os dados do usuário são carregados nos estados
      setRole(user.role ?? "CLIENT");
      setName(user.name ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setStatus(user.status ?? "PENDING");
    }
    setIsOpen(open);
  };

  // Verifica se a role é "admin" e desativa inputs
  const isDisabled = user.role?.toLowerCase() === "admin";

  // Atualizar usuário
  const handleUpdateUser = async () => {
    try {
      const updatedUser: UserDataOptional = {
        role: role || undefined,
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        status: status || undefined,
      };

      if (!user.id) {
        console.error("Erro: ID do usuário não encontrado");
        return;
      }

      const response = await usersServices.updateUser(user.id, updatedUser);

      console.log("Usuário atualizado com sucesso:", response);

      onUserUpdated(response);
toast.success("Usuário atualizado com sucesso!",{
        duration: 3000,
}); // Exibe mensagem de sucesso
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
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="icon"
          disabled={isDisabled}
        >
          <Pencil className="text-blue-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit the details of the user.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Role */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={setRole}
              value={role}
              disabled={isDisabled} // Desativa se a role for admin
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="AGENT">Agent</SelectItem>
                <SelectItem value="ADMIN" disabled>
                  Admin
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Inputs visíveis conforme a Role */}
          <form>
            <div className="grid gap-4">
              {/* Nome */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isDisabled}
                />
              </div>

              {/* Campos exclusivos para "client" e "agent" */}
              {(role === "CLIENT" || role === "AGENT") && (
                <>
                  {/* E-mail */}
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
                      disabled={isDisabled}
                    />
                  </div>

                  {/* Telefone */}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="col-span-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpdateUser}
            disabled={!role || !name || isDisabled}
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
