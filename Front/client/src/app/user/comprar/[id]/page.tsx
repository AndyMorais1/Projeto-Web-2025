"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";
import { incrementHouseView } from "@/utils/stats";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function HouseDetailPage() {
  const { id } = useParams();
  const { houses } = useHouses();
  const { users } = useUsers();
  const hasIncremented = useRef(false);

  const [visitorName, setVisitorName] = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const [visitMessage, setVisitMessage] = useState("");

  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const house = houses.find((h) => h.id === id);
  const agent = users.find((u) => u.id === house?.agentId);

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  useEffect(() => {
    if (!hasIncremented.current && typeof id === "string") {
      hasIncremented.current = true;
      incrementHouseView(id);
    }
  }, [id]);

  if (!house) {
    return (
      <div className="p-6 text-center text-gray-600">Casa não encontrada.</div>
    );
  }

  const handleScheduleVisit = () => {
    alert("Visita marcada com sucesso!");
  };

  const handleContactAgent = () => {
    alert("Mensagem enviada ao agente!");
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? house.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) =>
      prev === house.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{house.title}</h1>

      {/* Carrossel de imagens */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg mb-6">
        <img
          src={house.images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-all duration-300"
        />
        {house.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Descrição */}
      <p className="text-lg text-gray-700 mb-6">{house.description}</p>

      {/* Informações detalhadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mb-6">
        <div><strong>Tipo:</strong> {house.type}</div>
        <div><strong>Preço:</strong> {priceFormatter.format(house.price)}</div>
        <div><strong>Quartos:</strong> {house.details.rooms}</div>
        <div><strong>Banheiros:</strong> {house.details.bathrooms}</div>
        <div><strong>Área:</strong> {house.details.area} m²</div>
        <div><strong>Endereço:</strong> {house.location.address}</div>
        <div><strong>Cidade:</strong> {house.location.city}</div>
        <div><strong>CEP:</strong> {house.location.zipCode}</div>
        <div><strong>Visualizações:</strong> {house.views ?? 0}</div>
        <div>
          <strong>Publicado em:</strong>{" "}
          {format(new Date(house.createdAt), "dd 'de' MMMM yyyy", { locale: pt })}
        </div>
        <div>
          <strong>Agente:</strong> {agent?.name || "Desconhecido"}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {/* Marcar Visita */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Marcar Visita</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agendar Visita</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <Input
                placeholder="Seu nome"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
              />
              <Input
                placeholder="Telefone"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
              />
              <Textarea
                placeholder="Mensagem"
                rows={4}
                value={visitMessage}
                onChange={(e) => setVisitMessage(e.target.value)}
              />
              <Button onClick={handleScheduleVisit}>Enviar Pedido</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Falar com o Agente */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Falar com o Agente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enviar Mensagem ao Agente</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-4">
              <Input
                placeholder="Assunto"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
              />
              <Textarea
                placeholder="Mensagem"
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <Button onClick={handleContactAgent}>Enviar Email</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
