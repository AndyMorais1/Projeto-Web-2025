"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHouses } from "@/contexts/HousesContext";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone customizado para os pinos
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
  const { houses, setSelectedHouse, setIsDialogOpen } = useHouses();

  const handleMarkerClick = (houseId: string) => {
    const house = houses.find(h => h.id === houseId);
    if (house) {
      setSelectedHouse(house);
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[39.5, -8.0]}
        zoom={7}
        scrollWheelZoom
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {houses
          .filter(h => h.location.latitude !== undefined && h.location.longitude !== undefined)
          .map((house) => (
            <Marker
              key={house.id}
              position={[house.location.latitude!, house.location.longitude!]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(house.id!)
              }}
            >
              <Popup>
                <strong>{house.title}</strong>
                <br />
                {house.location.address}, {house.location.city}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
