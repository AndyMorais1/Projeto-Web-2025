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
import { CirclePlus } from "lucide-react";
import { usersServices } from "@/api/Users";
import { UserData } from "@/data/UserData";
import { toast } from "sonner";
import { uploadImage } from "@/utils/uploadImage";
import { useUsers } from "@/contexts/UsersContext";

export function DialogCreateUser({
  onUserCreated,
}: {
  onUserCreated: (user: UserData) => void;
}) {
  const [role, setRole] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = React.useState<boolean>(false); // ✅
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { currentUser } = useUsers();

  const handleCreateUser = async () => {
    try {
      let photo = "";
      if (image) {
        photo = await uploadImage(image);
      }

      const userData: UserData & { isSuperAdmin?: boolean } = {
        role,
        name,
        email,
        phone,
        password,
        status: "PENDING",
        photo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (role === "ADMIN" && currentUser?.isSuperAdmin) {
        userData.isSuperAdmin = isSuperAdmin; // ✅
      }

      usersServices
        .createUser(userData)
        .then((createdUser) => {
          toast.success("Usuário criado com sucesso!", {
            description: `Usuário ${createdUser.name} criado com sucesso!`,
            duration: 3000,
          });
          setIsOpen(false);
          setRole("");
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
          setImage(null);
          setIsSuperAdmin(false); // reset
          onUserCreated(createdUser);
        })
        .catch((error) => {
          toast.error("Erro ao criar usuário.", {
            description: error.message || "Erro ao criar usuário.",
            duration: 3000,
          });
          console.error("Erro ao criar usuário:", error);
        });
    } catch (error: any) {
      toast.error("Erro no upload da imagem.", {
        description: error.message || "Erro no upload da imagem.",
        duration: 3000,
      });
      console.error("Erro no upload da imagem:", error);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setRole("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setImage(null);
    setIsSuperAdmin(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus className="mr-2" />
          Criar Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
          <DialogDescription>
            Escolha o tipo de usuário antes de preencher os dados.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Select role */}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Tipo de Usuário</Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Cliente</SelectItem>
                <SelectItem value="AGENT">Agente</SelectItem>
                <SelectItem
                  value="ADMIN"
                  disabled={!currentUser?.isSuperAdmin}
                  title={!currentUser?.isSuperAdmin ? "Apenas superadmin pode criar um administrador" : ""}
                >
                  Administrador
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role && (
            <form>
              <div className="grid gap-4">
                {/* Nome */}
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
                  />
                </div>

                {/* Email e Telefone */}
                {(role === "CLIENT" || role === "AGENT" || role === "ADMIN") && (
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
                      />
                    </div>
                  </>
                )}

                {/* Senha */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Foto */}
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
                  />
                </div>

                {/* Superadmin toggle (somente se admin) */}
                {role === "ADMIN" && currentUser?.isSuperAdmin && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="superadmin" className="text-right">
                      Superadmin
                    </Label>
                    <input
                      id="superadmin"
                      type="checkbox"
                      checked={isSuperAdmin}
                      onChange={(e) => setIsSuperAdmin(e.target.checked)}
                      className="col-span-3 h-5 w-5"
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateUser}
            disabled={!role || !name || !password}
          >
            Criar
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
