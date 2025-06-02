"use client";

import { useEffect, useState } from "react";
import { DialogEditUser } from "./DialogEditUser";
import { DialogFilterUser } from "./DialogFilterUser";
import { DialogCreateUser } from "./DialogCreateUser";
import { usersServices } from "@/api/Users";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from "@/data/UserData";
import { useUsers } from "@/contexts/UsersContext";
import { toast } from "sonner";

// Função para renderizar o status do usuário
export const renderUserStatus = (status?: string) => {
  switch (status?.toUpperCase()) {
    case "ACTIVE":
      return <span className="text-green-600 font-semibold">Ativo</span>;
    case "INACTIVE":
      return <span className="text-red-600 font-semibold">Inativo</span>;
    case "PENDING":
      return <span className="text-yellow-600 font-semibold">Pendente</span>;
    default:
      return <span className="text-gray-600 font-semibold">Desconhecido</span>;
  }
};

// Função para renderizar o tipo de usuário
const renderUserRole = (role?: string) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return <span className="text-red-600 font-semibold">Administrador</span>;
    case "AGENT":
      return <span className="text-blue-600 font-semibold">Agente</span>;
    case "CLIENT":
      return <span className="text-green-600 font-semibold">Cliente</span>;
    default:
      return <span className="text-gray-600 font-semibold">Desconhecido</span>;
  }
};

export function UserTable() {
  const { users, setUsers, currentUser } = useUsers();
  const [originalUsers, setOriginalUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (users.length > 0 && originalUsers.length === 0) {
      setOriginalUsers(users);
    }
  }, [users]);

  const onUserUpdated = (updatedUser: UserData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setOriginalUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const onUserCreated = (createdUser: UserData) => {
    setUsers((prev) => [...prev, createdUser]);
    setOriginalUsers((prev) => [...prev, createdUser]);
  };

  const handleDeleteClick = async (userId: string) => {
    try {
      await usersServices.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setOriginalUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("Usuário excluído com sucesso!", { duration: 3000 });
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error.message);
    }
  };

  const handleFilter = ({ role }: { role?: string | null }) => {
    if (!role) {
      setUsers(originalUsers);
    } else {
      const filtered = originalUsers.filter(
        (user) => user.role.toLowerCase() === role.toLowerCase()
      );
      setUsers(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      {/* Botões de Filtro e Criar Usuário */}
      <div className="flex flex-wrap justify-end gap-2 my-5 w-full max-w-5xl">
        <DialogFilterUser onFilter={handleFilter} />
        <DialogCreateUser onUserCreated={onUserCreated} />
      </div>

      {/* Tabela de Usuários */}
      <div className="w-full max-w-5xl overflow-x-auto">
        <Table className="w-full border">
          <TableCaption className="mt-10">
            Lista de usuários cadastrados no sistema. / Apenas superadmins
            podem editar ou excluir administradores.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Telefone</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => {
                const isAdmin = user.role.toLowerCase() === "admin";
                const canModify = !isAdmin || currentUser?.isSuperAdmin;

                return (
                  <TableRow key={String(user.id)}>
                    <TableCell className="text-center">
                      {renderUserRole(user.role)}
                    </TableCell>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">
                      {user.email || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.phone || "---"}
                    </TableCell>
                    <TableCell className="text-center">
                      {renderUserStatus(user.status)}
                    </TableCell>
                    <TableCell className="flex justify-center gap-4">
                      <DialogEditUser
                        user={user}
                        onUserUpdated={onUserUpdated}
                        disabled={!canModify}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteClick(user.id || "")}
                        disabled={!canModify}
                        title={
                          !canModify
                            ? "Apenas superadmin pode excluir administradores"
                            : ""
                        }
                      >
                        <Trash className="text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
