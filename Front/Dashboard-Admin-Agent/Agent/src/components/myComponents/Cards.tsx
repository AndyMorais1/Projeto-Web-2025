"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, NotebookText } from "lucide-react";
import { useHouses } from "@/contexts/HousesContext";
import { useUsers } from "@/contexts/UsersContext";

const cardsInfo = [
  {
    title: "Imóveis",
    icon: Home,
    key: "houses",
  },
  {
    title: "Visitas",
    icon: NotebookText,
    key: "visits",
  },
];

export function Cards() {
  const { houses } = useHouses();

  const totalHouses = houses.length;
  const totalVisits = 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
      {cardsInfo.map((card) => {
        const value =
          card.key === "houses"
            ? totalHouses
            : card.key === "visits"
            ? totalVisits
            : 0;

        return (
          <Card key={card.key} className="w-full bg-white rounded-lg shadow-md">
            <CardHeader>
              <div className="flex gap-2 items-center">
                <card.icon className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-xl font-semibold">
                  {card.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-4xl font-bold">
                {value}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
