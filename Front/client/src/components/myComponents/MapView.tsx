"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Evita erro do window com SSR
const DynamicMap = dynamic(() => import("./MapClient"), {
  ssr: false,
});

export function MapView() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Garante que só renderiza no cliente
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <DynamicMap />;
}
