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
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";
import { RatingService } from "@/api/Rating";
import { AgentRating } from "@/data/RatingData";

// Tipagem estendida
interface FullRating extends AgentRating {
  client: { id: string; name: string; photo?: string };
}

export default function AgentDetails() {
  const { users, currentUser } = useUsers();
  const { houses } = useHouses();
  const [agent, setAgent] = useState<any>(null);
  const [agentHouses, setAgentHouses] = useState<any[]>([]);
  const [ratingSummary, setRatingSummary] = useState<{ average: number; totalRatings: number } | null>(null);
  const [ratings, setRatings] = useState<FullRating[]>([]);
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [hasRated, setHasRated] = useState<boolean>(false);
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
      if (house.id) initialIndexes[house.id] = 0;
    });
    setCarouselIndexes(initialIndexes);

    if (id && currentUser?.id) {
      RatingService.getAgentRatingSummary(id as string)
        .then(setRatingSummary)
        .catch(() => toast.error("Erro ao carregar avaliações do agente"));

      RatingService.getRatingsForAgent(id as string)
        .then((res: FullRating[]) => {
          setRatings(res);
          const alreadyRated = res.some((r) => r.clientId === currentUser.id);
          setHasRated(alreadyRated);
        })
        .catch(() => { });
    }
  }, [id, users, houses, currentUser]);

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

  const handleRateAgent = async () => {
    if (!currentUser) {
      toast.error("Você precisa estar autenticado para avaliar.");
      return;
    }

    if (hasRated) {
      toast.info("Você já avaliou este agente.");
      return;
    }

    if (score < 1 || score > 5) {
      toast.error("Escolha uma nota entre 1 e 5.");
      return;
    }

    try {
      await RatingService.rateAgent(agent.id, score, comment);
      toast.success("Avaliação enviada com sucesso!");
      setScore(0);
      setComment("");
      setHasRated(true);

      const updated = await RatingService.getAgentRatingSummary(agent.id);
      setRatingSummary(updated);

      const newRatings = await RatingService.getRatingsForAgent(agent.id);
      setRatings(newRatings);
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar avaliação.");
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
            Membro desde: {format(new Date(agent.createdAt), "dd 'de' MMMM yyyy", { locale: pt })}
          </p>

          {agentHouses.length > 0 && (
            <p className="text-gray-600 text-sm mt-1">
              Preço dos imóveis:{" "}
              <strong>
                {new Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(Math.min(...agentHouses.map((house) => house.price || 0)))}
                {" "}
                -{" "}
                {new Intl.NumberFormat("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                }).format(Math.max(...agentHouses.map((house) => house.price || 0)))}
              </strong>
            </p>
          )}


          {ratingSummary && (
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-yellow-600 flex items-center justify-center gap-2">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                {ratingSummary.average.toFixed(1)} / 5
              </p>
              <p className="text-sm text-gray-600">
                ({ratingSummary.totalRatings} avaliação{ratingSummary.totalRatings !== 1 && "s"})
              </p>
            </div>
          )}

          {currentUser && currentUser.id !== agent.id && !hasRated && (
            <div className="mt-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Avaliar agente</h3>
              <Input
                type="number"
                placeholder="Nota (1 a 5)"
                min={1}
                max={5}
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
              />
              <Textarea
                placeholder="Comentário (opcional)"
                className="mt-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="mt-2" onClick={handleRateAgent}>
                Enviar Avaliação
              </Button>
            </div>
          )}

          {hasRated && (
            <p className="text-sm text-green-600 mt-4">Você já avaliou este agente.</p>
          )}

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentHouses.map((house) => {
            const currentIndex = carouselIndexes[house.id] || 0;
            const totalImages = Array.isArray(house.images) ? house.images.length : 0;

            return (
              <Link href={`/user/comprar/${house.id}`} key={house.id} className="w-full">
                <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer min-h-[420px]">
                  <CardContent className="flex flex-col h-full p-0 relative">
                    <div className="relative w-full h-52">
                      <img
                        src={house.images?.[currentIndex] || "/placeholder.jpg"}
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
                          {house.details.rooms} quartos · {house.details.bathrooms} banheiros · {house.details.area} m²
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

        {/* 🔽 Seção de Avaliações */}
        <h3 className="text-xl font-bold mt-10 mb-4">Avaliações dos Clientes</h3>
        {ratings.length === 0 ? (
          <p className="text-gray-600">Este agente ainda não recebeu avaliações.</p>
        ) : (
          <div className="space-y-4">
            {[...ratings]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((rating, index) => (

                <div
                  key={index}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      {rating.client?.name || "Cliente"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(rating.createdAt), "dd/MM/yyyy", { locale: pt })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600 mb-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm">{rating.score} / 5</span>
                  </div>
                  {rating.comment && (
                    <p className="text-sm text-gray-700">{rating.comment}</p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
