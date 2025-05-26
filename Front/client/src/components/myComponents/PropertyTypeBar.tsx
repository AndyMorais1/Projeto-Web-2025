// src/components/myComponents/PropertyTypeBar.tsx
"use client";
import { Type } from "@/data/HouseData";
import { useState } from "react";

const labels: Record<Type, string> = {
  APARTMENT: "Apartamento",
  HOUSE: "Casa",
  PENTHOUSE: "Cobertura",
  STUDIO: "Estúdio",
  DUPLEX: "Duplex",
};

export default function PropertyTypeBar() {
  const [selected, setSelected] = useState<Type | null>(null);

  return (
    <div className="bg-white border-b shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
        {Object.values(Type).map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              selected === type
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {labels[type]}
          </button>
        ))}
      </div>
    </div>
  );
}
