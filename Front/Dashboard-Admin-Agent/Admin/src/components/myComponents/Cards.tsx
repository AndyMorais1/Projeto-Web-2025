"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Home, Check } from "lucide-react";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";

const cardsInfo = [
  {
    title: "Usuários",
    icon: User,
    number: "",
  },
  {
    title: "Imóveis",
    icon: Home,
    number: "",
  },
  {
    title: "Requisições",
    icon: Check,
    number: "",
  },
];

export function Cards() {
  const { users } = useUsers();
  const { houses } = useHouses();

  const totalHouses = houses.length;

  const totalUsers = users.length;
  const pendingUsers = users.filter(
    (user) => user.status?.toLowerCase() === "pending"
  ).length;
  const pendingAgents = users.filter(
    (user) => user.status?.toLowerCase() === "pending" && user.role === "AGENT"
  ).length;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 w-full">
      {cardsInfo.map((card, index) => (
        <Card key={index} className="w-full bg-white rounded-lg shadow-md">
          <CardHeader>
            <div className="flex gap-2 items-center">
              <card.icon className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-xl font-semibold">
                {card.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <CardDescription className="text-4xl font-bold">
                {card.title === "Usuários" ? totalUsers : card.number}
                {card.title === "Imóveis" ? totalHouses : card.number}
                {card.title === "Requisições" ? pendingAgents : card.number}
              </CardDescription>

              {card.title === "Usuários" && (
                <div className="text-m space-y-1">
                  <p className="text-yellow-600 font-medium">{pendingUsers} pendentes</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
