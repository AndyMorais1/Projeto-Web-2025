"use client";
import React, { useEffect, useState } from "react";
import { useUsers } from "@/contexts/UsersContext";
import { DialogEditProfile } from "@/components/myComponents/DialogEditProfile";
import { RatingService } from "@/api/Rating";
import { Star } from "lucide-react";

export default function ProfilePage() {
  const { currentUser } = useUsers();
  const [ratingSummary, setRatingSummary] = useState<{
    average: number;
    totalRatings: number;
  } | null>(null);

  useEffect(() => {
    if (currentUser?.role === "AGENT" && currentUser.id) {
      RatingService.getAgentRatingSummary(currentUser.id)
        .then(setRatingSummary)
        .catch(() => {
          setRatingSummary(null);
        });
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="px-6 py-4 border-b border-gray-200 bg-white z-10">
        <h1 className="text-2xl font-bold">Perfil</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-6 mt-8">
        {/* Imagem do usuário */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 mb-4">
          <img
            src={currentUser?.photo}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nome e e-mail */}
        <h2 className="text-xl font-semibold">{currentUser?.name}</h2>
        <p className="mt-1 text-gray-600">{currentUser?.email}</p>

        {/* ⭐️ Rating (se for agente) */}
        {currentUser?.role === "AGENT" && ratingSummary && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-yellow-600 flex items-center gap-2 justify-center">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              {ratingSummary.average.toFixed(1)} / 5
            </p>
            <p className="text-sm text-gray-600">
              ({ratingSummary.totalRatings} avaliação{ratingSummary.totalRatings !== 1 && "s"})
            </p>
          </div>
        )}

        {/* Botão de editar */}
        <div className="mt-6">
          <DialogEditProfile />
        </div>
      </div>
    </div>
  );
}
