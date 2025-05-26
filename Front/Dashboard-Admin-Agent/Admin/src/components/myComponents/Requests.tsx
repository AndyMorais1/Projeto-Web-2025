"use client";
import { useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, User, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUsers } from "@/contexts/UsersContext";
import { UserData } from "@/data/UserData";
import { usersServices } from "@/api/Users";
import { EmailDialog } from "./EmailDialog";
import { toast } from "sonner";
import { renderUserStatus } from "./UserTable";

export function Requests() {
  const { users, setUsers } = useUsers();
  const [selectedAgent, setSelectedAgent] = useState<UserData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pendingAgents = users.filter(
    (user) =>
      user.role?.toUpperCase() === "AGENT" &&
      user.status?.toUpperCase() === "PENDING"
  );

  const handleInfoClick = (agent: UserData) => {
    setSelectedAgent(agent);
    setIsDialogOpen(true);
  };

  const handleAcceptClick = async (agent: UserData) => {
    try {
      await usersServices.updateAgentStatus(agent.id!);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === agent.id ? { ...user, status: "ACTIVE" } : user
        )
      );
      setSelectedAgent(agent);
      toast.success("Agente aceito!", {
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error accepting agent:", error.message);
      toast.error("Erro ao aceitar o agente!", {
        duration: 3000,
      });
    }
  };

  const handleRejectClick = async (agent: UserData) => {
    try {
      await usersServices.deleteUser(agent.id!);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== agent.id)
      );
      setSelectedAgent(agent);
      toast.success("Agente rejeitado com sucesso!", {
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error rejecting agent:", error.message);
      toast.error("Erro ao rejeitar o agente!", {
        duration: 3000,
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="p-4">
      {/* Verifica se há agentes pendentes */}
      {pendingAgents.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          Nenhum agente pendente no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingAgents.map((agent) => (
            <Card key={agent.id} className="flex flex-col w-full max-w-xs sm:max-w-md mx-auto">
              <CardHeader className="flex flex-row items-center gap-3">
                <User className="w-6 h-6 text-gray-600" />
                <CardTitle className="text-sm sm:text-base">{agent.name}</CardTitle>
              </CardHeader>

              <CardFooter className="flex justify-between gap-2 mt-4">
                <Button
                  variant="outline"
                  className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                  onClick={() => handleAcceptClick(agent)}
                >
                  <Check className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleRejectClick(agent)}
                >
                  <X className="w-5 h-5" />
                </Button>
                <EmailDialog recipientEmail={agent.email} />
                <Button
                  variant="outline"
                  className="text-black border-black hover:bg-black hover:text-white"
                  onClick={() => handleInfoClick(agent)}
                >
                  <Info className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de informações do agente */}
      {selectedAgent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informações do Agente</DialogTitle>
              <DialogDescription>
                Detalhes sobre {selectedAgent.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-1.5">
                <p>
                  <strong>Nome:</strong> {selectedAgent.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedAgent.email}
                </p>
                <p>
                  <strong>Telefone:</strong> {selectedAgent.phone}
                </p>
                <p>
                  <strong>Status:</strong>  {renderUserStatus(selectedAgent.status)}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
