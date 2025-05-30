"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUsers } from "@/contexts/UsersContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function AgentDetails() {
  const { users } = useUsers();
  const [agent, setAgent] = useState<any>(null);
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const foundAgent = users.find((user) => user.id === id);
    setAgent(foundAgent);
  }, [id, users]);

  if (!agent) return <div className="p-6">Carregando detalhes do agente...</div>;

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${agent.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full p-0">
      <div className="p-8 w-full flex flex-col items-center">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-8 text-center">Detalhes do Agente</h1>

        {/* Foto e informações principais */}
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <img
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-blue-600"
            src={agent.photo || "/default-avatar.jpg"}
            alt={agent.name}
          />
          <h2 className="text-2xl font-semibold">{agent.name}</h2>
          <p className="text-gray-700 mt-2">{agent.email}</p>
          <p className="text-gray-700">{agent.phone}</p>
          <p className="text-gray-600 text-sm mt-1 capitalize">
            Status: <strong>{agent.status || "ativo"}</strong>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Membro desde:{" "}
            {format(new Date(agent.createdAt), "dd 'de' MMMM yyyy", {
              locale: pt,
            })}
          </p>

          {/* Botão de envio de email */}
          <div className="mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Enviar Email</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar Email para {agent.name}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                  <Input
                    placeholder="Assunto"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <Textarea
                    placeholder="Mensagem"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button onClick={handleSendEmail}>Enviar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
