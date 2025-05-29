"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { UserData } from "@/data/UserData";

interface AgentCardProps {
  agent: UserData;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card className="flex justify-between p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
          <img
            src={agent?.photo || "/profilepic.png"}
            alt={agent.name[0]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{agent.name}</span>
          <span className="text-sm text-gray-500 break-all">{agent.email}</span>
          <span className="text-sm text-gray-500">{agent.phone}</span>
        </div>
      </div>
    </Card>
  );
};
