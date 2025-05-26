"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useHouses } from "@/contexts/HousesContext";
import { incrementHouseView } from "@/utils/stats";

export default function HouseDetailPage() {
  const { id } = useParams();
  const { houses } = useHouses();
  const hasIncremented = useRef(false); // <- Flag de controle

  const house = houses.find((h) => h.id === id);

  useEffect(() => {
    if (!hasIncremented.current && typeof id === "string") {
      hasIncremented.current = true;
      incrementHouseView(id);
    }
  }, [id]);

  if (!house) {
    return (
      <div className="p-6 text-center text-gray-600">
        Casa não encontrada.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{house.title}</h1>
      <img
        src={house.images[0]}
        alt={house.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-lg text-gray-700">{house.description}</p>
      {/* adicione mais detalhes se quiser */}
    </div>
  );
}
