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

interface AgentCardProps {
  agent: UserData;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${agent.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left" onClick={() => setOpen(true)}>
          <Card className="flex justify-between p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
                <img
                  src={agent?.photo || "/profilepic.png"}
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
        <div className="flex flex-col items-center gap-2 text-center">
          <img
            src={agent?.photo || "/profilepic.png"}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <p className="text-lg font-semibold">{agent.name}</p>
          <p className="text-sm text-muted-foreground">{agent.email}</p>
          <p className="text-sm">{agent.phone}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
