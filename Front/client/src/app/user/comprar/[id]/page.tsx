"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";
import { useHouseTypes } from "@/contexts/HouseTypesContext";
import { useVisits } from "@/contexts/VisitsContext";
import { incrementHouseView } from "@/utils/stats";
import { toast } from "sonner";
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
import { format, formatISO } from "date-fns";
import { pt } from "date-fns/locale";

export default function HouseDetailPage() {
  const { id } = useParams();
  const { houses } = useHouses();
  const { users, currentUser } = useUsers();
  const { types } = useHouseTypes();
  const { createVisit } = useVisits();

  const hasIncremented = useRef(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitMessage, setVisitMessage] = useState("");
  const [isSendingVisit, setIsSendingVisit] = useState(false);

  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const house = houses.find((h) => h.id === id);

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

  const agent = users.find((u) => u.id === house.agentId);
  const typeName =
    types.find((t) => t.id === house.typeId)?.name || "Tipo desconhecido";

  const priceFormatter = new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  });

  const handleScheduleVisit = async () => {
    if (!visitDate || !currentUser?.id || !house.id) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSendingVisit(true);

    try {
      const res = await createVisit({
        clientId: currentUser.id,
        houseId: house.id,
        date: formatISO(new Date(visitDate)),
        message: visitMessage,
      });

      if (res) {
        toast.success("Visita agendada com sucesso!");
        setVisitDate("");
        setVisitMessage("");
      } else {
        toast.error("Erro ao agendar a visita.");
      }
    } catch (error) {
      console.error("Erro ao agendar visita:", error);
      toast.error("Ocorreu um erro ao enviar o pedido.");
    } finally {
      setIsSendingVisit(false);
    }
  };

  const handleContactAgent = () => {
    toast.success("Mensagem enviada ao agente!");
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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Carrossel de imagens */}
      <div className="relative w-[840px] h-[440px] mx-auto rounded-lg overflow-hidden">
        <img
          src={house.images[currentIndex]}
          alt={`Imagem ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {house.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      <h1 className="text-3xl font-bold text-gray-800">{house.title}</h1>

      {/* Informações principais */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {priceFormatter.format(house.price)}
          </h1>
          <p className="text-gray-600 mb-1">
            {house.location.address}, {house.location.city}
          </p>
          <p className="text-sm text-gray-500">
            {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
            {house.details.area} m²
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Dialog de Visita */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Agendar visita</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Visita</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  type="datetime-local"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
                <Textarea
                  placeholder="Mensagem adicional"
                  rows={4}
                  value={visitMessage}
                  onChange={(e) => setVisitMessage(e.target.value)}
                />
                <Button onClick={handleScheduleVisit} disabled={isSendingVisit}>
                  {isSendingVisit ? "Enviando..." : "Enviar Pedido"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog para contato com agente */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Falar com o agente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Mensagem ao Agente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
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

      {/* Descrição */}
      <div className="text-gray-700 text-base leading-relaxed">
        {house.description}
      </div>

      {/* Detalhes técnicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div><strong>Tipo:</strong> {typeName}</div>
        <div><strong>Área:</strong> {house.details.area} m²</div>
        <div><strong>Quartos:</strong> {house.details.rooms}</div>
        <div><strong>Banheiros:</strong> {house.details.bathrooms}</div>
        <div><strong>CEP:</strong> {house.location.zipCode}</div>
        <div><strong>Visualizações:</strong> {house.views ?? 0}</div>
        <div>
          <strong>Publicado em:</strong>{" "}
          {format(new Date(house.createdAt), "dd 'de' MMMM yyyy", {
            locale: pt,
          })}
        </div>
        <div><strong>Agente:</strong> {agent?.name || "Desconhecido"}</div>
      </div>
    </div>
  );
}
