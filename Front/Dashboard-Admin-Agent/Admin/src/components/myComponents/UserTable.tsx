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

// Função auxiliar para cor do status
const getStatusTextColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "text-green-600 font-semibold";
    case "INACTIVE":
      return "text-red-600 font-semibold";
    case "PENDING":
      return "text-yellow-600 font-semibold";
    default:
      return "text-gray-600 font-semibold";
  }
};

export function UserTable() {
  const { users, setUsers } = useUsers();
  const [originalUsers, setOriginalUsers] = useState<UserData[]>([]);

  // Salvar os dados originais apenas uma vez ao carregar
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
      setUsers(originalUsers); // Restaura a lista original
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
            A list of users / It is not possible to edit or delete users with ADMIN role
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={String(user.id)}>
                  <TableCell className="text-center font-medium">
                    {user.role}
                  </TableCell>
                  <TableCell className="text-center">{user.name}</TableCell>
                  <TableCell className="text-center">
                    {user.email || "-"}
                  </TableCell>
                  <TableCell className="text-center">{user.phone}</TableCell>
                  <TableCell
                    className={`text-center ${getStatusTextColor(
                      user.status || ""
                    )}`}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell className="flex justify-center gap-4">
                    <DialogEditUser
                      user={user}
                      onUserUpdated={onUserUpdated}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteClick(user.id || "")}
                      disabled={user.role.toLowerCase() === "admin"}
                    >
                      <Trash className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
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
