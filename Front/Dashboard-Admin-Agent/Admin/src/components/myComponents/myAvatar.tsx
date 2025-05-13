"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useUsers } from "@/contexts/UsersContext";

export function AvatarDemo() {
  const { currentUser } = useUsers();

  return (
    <Avatar className="w-24 h-24">
      <AvatarImage src="#" alt="profilepic" />
      <AvatarFallback className="text-4xl">
        {currentUser?.name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
