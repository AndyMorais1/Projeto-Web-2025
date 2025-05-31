"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";
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
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function AgentDetails() {
  const { users, currentUser } = useUsers();
  const { houses } = useHouses();
  const [agent, setAgent] = useState<any>(null);
  const [agentHouses, setAgentHouses] = useState<any[]>([]);
  const { id } = useParams();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [carouselIndexes, setCarouselIndexes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const foundAgent = users.find((user) => user.id === id);
    setAgent(foundAgent);

    const filteredHouses = houses.filter((house) => house.agentId === id);
    setAgentHouses(filteredHouses);

    const initialIndexes: { [key: string]: number } = {};
    filteredHouses.forEach((house) => {
      if (house.id) {
        initialIndexes[house.id] = 0;
      }
    });
    setCarouselIndexes(initialIndexes);
  }, [id, users, houses]);

  const handleSendEmail = async () => {
    if (!subject || !message) {
      toast.error("Assunto e mensagem são obrigatórios.");
      return;
    }

    if (!currentUser) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/email/contact-agent", {
        from: currentUser.email,
        fromName: currentUser.name,
        to: agent.email,
        subject,
        message,
      });

      toast.success("E-mail enviado ao agente com sucesso!");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      console.error("Erro ao enviar e-mail:", error.response?.data || error.message);
      toast.error("Erro ao enviar e-mail.");
    }
  };

  if (!agent) return <div className="p-6">Carregando detalhes do agente...</div>;

  return (
    <div className="bg-gray-100 min-h-screen w-full p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Detalhes do Agente</h1>

        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 mb-8">
          <img
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-blue-600"
            src={agent.photo || "/default-avatar.jpg"}
            alt={agent.name}
          />
          <h2 className="text-2xl font-semibold">{agent.name}</h2>
          <p className="text-gray-700 mt-1">{agent.email}</p>
          <p className="text-gray-700">{agent.phone}</p>
          <p className="text-gray-600 text-sm mt-1 capitalize">
            Status: <strong>{agent.status || "ativo"}</strong>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Membro desde:{" "}
            {format(new Date(agent.createdAt), "dd 'de' MMMM yyyy", { locale: pt })}
          </p>

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

        <h3 className="text-xl font-bold mb-4">Imóveis do Agente</h3>

        {agentHouses.length === 0 ? (
          <p className="text-gray-600">Este agente ainda não possui imóveis cadastrados.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentHouses.map((house) => {
              const currentIndex = carouselIndexes[house.id] || 0;
              const totalImages = house.images.length;
              const houseTypeName = house.type?.name || "";
              const isFavorited = false;

              const toggleFavorite = async (_house: any) => {};

              return (
                <Link href={`/user/comprar/${house.id}`} key={house.id} className="w-full">
                  <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer min-h-[420px]">
                    <CardContent className="flex flex-col h-full p-0 relative">
                      <Button
                        className="absolute top-3 right-3 bg-white text-red-500 hover:bg-red-50 shadow-sm z-10 border border-red-500"
                        size="icon"
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          await toggleFavorite(house);
                          toast.success(
                            isFavorited
                              ? "Removido dos favoritos 💔"
                              : "Adicionado aos favoritos ❤️"
                          );
                        }}
                      >
                        <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500" : "fill-none"}`} />
                      </Button>

                      <div className="relative w-full h-52">
                        <img
                          src={house.images[currentIndex]}
                          alt={house.title}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                        {totalImages > 1 && (
                          <>
                            <button
                              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCarouselIndexes((prev) => ({
                                  ...prev,
                                  [house.id]: currentIndex === 0 ? totalImages - 1 : currentIndex - 1,
                                }));
                              }}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCarouselIndexes((prev) => ({
                                  ...prev,
                                  [house.id]: currentIndex === totalImages - 1 ? 0 : currentIndex + 1,
                                }));
                              }}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div className="space-y-1">
                          <div className="text-lg font-semibold text-gray-900">{house.title}</div>
                          <div className="text-sm text-gray-700">
                            {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
                            {house.details.area} m² - {houseTypeName}
                          </div>
                          <div className="text-sm text-gray-600">
                            {house.location.address}, {house.location.city}
                          </div>
                        </div>
                        <div className="text-xl font-bold text-blue-600 mt-2">
                          {new Intl.NumberFormat("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          }).format(house.price)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
