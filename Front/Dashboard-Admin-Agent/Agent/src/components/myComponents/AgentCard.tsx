"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UserData } from "@/data/UserData";
import { toast } from "sonner";
import { useUsers } from "@/contexts/UsersContext";

interface AgentCardProps {
  agent: UserData;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUsers();

  const handleSendEmail = async () => {
    if (!subject || !message) {
      toast.error("Preencha o assunto e a mensagem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/email/contact-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: agent.email,
          from: currentUser?.email || "",
          fromName: currentUser?.name || "Usuário",
          subject,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("E-mail enviado com sucesso!");
        setSubject("");
        setMessage("");
        setOpen(false);
      } else {
        toast.error(data.error || "Erro ao enviar e-mail.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      toast.error("Erro inesperado ao enviar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left" onClick={() => setOpen(true)}>
          <Card className="flex justify-between p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
                <img
                  src={agent?.photo}
                  alt={agent.name[0]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{agent.name}</span>
                <span className="text-sm text-gray-500">{agent.email}</span>
              </div>
            </div>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do Agente</DialogTitle>
        </DialogHeader>

        {/* Dados do agente */}
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <img
            src={agent?.photo || "/profilepic.png"}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <p className="text-lg font-semibold">{agent.name}</p>
          <p className="text-sm text-muted-foreground">{agent.email}</p>
          <p className="text-sm">{agent.phone}</p>
        </div>

        {/* Formulário para envio de e-mail */}
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Assunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="Mensagem"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSendEmail} disabled={loading}>
            {loading ? "Enviando..." : "Enviar Email"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
