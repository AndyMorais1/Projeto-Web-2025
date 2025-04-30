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
    title: "Users",
    icon: User,
    number: "",
  },
  {
    title: "Houses",
    icon: Home,
    number: "",
  },
  {
    title: "Requests",
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
                {card.title === "Users" ? totalUsers : card.number}
                {card.title === "Houses" ? totalHouses : card.number}
                {card.title === "Requests" ? pendingAgents : card.number}
              </CardDescription>

              {card.title === "Users" && (
                <div className="text-m space-y-1">
                  <p className="text-yellow-600 font-medium">{pendingUsers} pending</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
