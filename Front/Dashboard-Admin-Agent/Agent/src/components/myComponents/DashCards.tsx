"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Home, Check } from "lucide-react";
//import { useUsers } from "@/data/UsersContext";

const cardsInfo = [
  {
    title: "Users",
    icon: User,
    number: 0,
  },
  {
    title: "Houses",
    icon: Home,
    number: 0,
  },
  {
    title: "Requests",
    icon: Check,
    number: 0,
  },
];

export function Cards() {
  //const { users } = useUsers();

  const totalUsers = 0;
  const pendingUsers = 0;

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
                {card.number}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
