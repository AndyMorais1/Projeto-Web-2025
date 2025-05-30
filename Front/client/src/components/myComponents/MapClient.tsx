"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useHouses } from "@/contexts/HousesContext";
import "leaflet/dist/leaflet.css";
import L, { Marker as LeafletMarker } from "leaflet";
import { useEffect, useState, useRef } from "react";
import { GeoJsonObject, Feature, Geometry } from "geojson";
import { Layer } from "leaflet";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { toast } from "sonner";

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
  const { houses, setSelectedDistrict } = useHouses();
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/portugal-distrito.geojson')
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const handleMarkerClick = (houseId: string, marker: LeafletMarker) => {
    const token = Cookie.get("token");

    if (!token) {
      toast.warning("Você precisa estar logado para ver os detalhes do imóvel.");
      router.push("/login");
      return;
    }

    marker.openPopup();
    setTimeout(() => {
      router.push(`/user/comprar/${houseId}`);
    }, 300);
  };

  const onEachDistrict = (feature: Feature<Geometry, any>, layer: Layer) => {
    const name = feature.properties?.dis_name || "Distrito desconhecido";

    layer.bindPopup(`<strong>${name}</strong>`);
    (layer as any).setStyle({
      color: "#2563EB",
      weight: 2,
      fillOpacity: 0.1,
    });

    layer.on({
      mouseover: (e: any) => e.target.setStyle({ fillOpacity: 0.4 }),
      mouseout: (e: any) => e.target.setStyle({ fillOpacity: 0.1 }),
      click: () => {
        if (name !== "Distrito desconhecido") {
          setSelectedDistrict(name);
        }
      },
    });
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

        {/* Polígonos dos Distritos */}
        {geoData && typeof geoData === "object" && "features" in geoData && (
          <GeoJSON data={geoData} onEachFeature={onEachDistrict} />
        )}

        {/* Marcadores das Casas */}
        {houses
          .filter(h => typeof h.location.latitude === "number" && typeof h.location.longitude === "number")
          .map((house) => {
            const markerRef = useRef<LeafletMarker>(null);

            return (
              <Marker
                key={house.id}
                position={[house.location.latitude!, house.location.longitude!]}
                icon={customIcon}
                ref={markerRef}
                eventHandlers={{
                  click: () => {
                    if (markerRef.current) {
                      handleMarkerClick(house.id!, markerRef.current);
                    }
                  },
                }}
              >
                <Popup>
                  <strong>{house.title}</strong><br />
                  {house.location.address}, {house.location.city}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
