"use client";

import React, { useEffect, useState } from "react";
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
import { Star } from "lucide-react";
import { RatingService } from "@/api/Rating";

interface AgentCardProps {
  agent: UserData;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useUsers();

  const [rating, setRating] = useState<{ average: number; total: number } | null>(null);

  const isOwnProfile = currentUser?.id === agent.id;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        if (!agent.id) return;
        const summary = await RatingService.getAgentRatingSummary(agent.id);
        setRating({ average: summary.average, total: summary.totalRatings });
      } catch {
        setRating(null);
      }
    };
    fetchRating();
  }, [agent.id]);

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

  const cardContent = (
    <Card
      className={`flex justify-between p-6 rounded-xl transition-shadow ${
        isOwnProfile
          ? "bg-gray-100 cursor-not-allowed opacity-70"
          : "bg-gray-50 shadow-sm hover:shadow-md cursor-pointer"
      }`}
    >
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
          {rating && (
            <span className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-500" />
              {rating.average.toFixed(1)} ({rating.total})
            </span>
          )}
        </div>
      </div>
    </Card>
  );

  if (isOwnProfile) {
    return <div>{cardContent}</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left" onClick={() => setOpen(true)}>
          {cardContent}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do Agente</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <img
            src={agent?.photo || "/profilepic.png"}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <p className="text-lg font-semibold">{agent.name}</p>
          <p className="text-sm text-muted-foreground">{agent.email}</p>
          <p className="text-sm">{agent.phone}</p>
          {rating && (
            <p className="text-sm text-yellow-600 mt-1">
              <Star className="inline-block w-4 h-4 fill-yellow-500" /> {rating.average.toFixed(1)} (
              {rating.total} avaliações)
            </p>
          )}
        </div>

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
