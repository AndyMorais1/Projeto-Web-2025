// app/components/Initializer.tsx
"use client";

import { useEffect } from "react";
import { useUsers } from "@/contexts/UsersContext";
import { useHouses } from "@/contexts/HousesContext";
import { useHouseTypes } from "@/contexts/HouseTypesContext";

export default function Initializer() {
  const { initializeUsersData } = useUsers();
  const { initializeHouses } = useHouses();
  const { refreshTypes } = useHouseTypes();

  useEffect(() => {
    const loadData = async () => {
      await initializeUsersData();
      await initializeHouses();
        await refreshTypes();
    };

    loadData();
  }, []);

  return null;
}
