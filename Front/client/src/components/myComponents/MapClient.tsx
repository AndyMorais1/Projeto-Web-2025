"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHouses } from "@/contexts/HousesContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Ícone customizado
const customIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapClient() {
  const { houses } = useHouses();

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[39.5, -8.0]}
        zoom={7}
        scrollWheelZoom
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {houses
          .filter(h => h.location.latitude && h.location.longitude)
          .map(house => (
            <Marker
              key={house.id}
              position={[house.location.latitude!, house.location.longitude!]}
              icon={customIcon}
            >
              <Popup minWidth={260} maxWidth={260} className="!p-0">
                <Link href={`/user/comprar/${house.id}`}>
                  <div className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-200 bg-white">
                    <img
                      src={house.images[0]}
                      alt={house.title}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-3 space-y-1">
                      <h3 className="text-sm font-bold leading-tight line-clamp-2">{house.title}</h3>
                      <p className="text-xs text-gray-600">
                        {house.details.rooms} quartos · {house.details.bathrooms} banheiros ·{" "}
                        {house.details.area} m²
                      </p>
                      <p className="text-xs text-gray-500">{house.location.city}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        {new Intl.NumberFormat("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        }).format(house.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              </Popup>

            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
