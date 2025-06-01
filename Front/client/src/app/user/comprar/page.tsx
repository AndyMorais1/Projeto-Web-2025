"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapView } from "@/components/myComponents/MapView";
import { Houses } from "@/components/myComponents/Houses";
import { SearchFiltersBar } from "@/components/myComponents/searchfilterbar";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<{
    priceMin: number | null;
    priceMax: number | null;
    rooms: number | null;
    type: string | null;
  }>({
    priceMin: null,
    priceMax: null,
    rooms: null,
    type: null,
  });

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    setSearchQuery(initialSearch);
  }, [searchParams]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full md:w-[50%] h-full bg-gray-100">
          <MapView />
        </div>

        <div className="w-full md:w-[50%] h-full bg-white border-l border-gray-200 flex flex-col">
          <div className="py-2 bg-white border-b shadow-sm z-10">
            <SearchFiltersBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-100 py-4 px-2">
            <Houses searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}
