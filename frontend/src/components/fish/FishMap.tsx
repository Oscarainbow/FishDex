"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import type { FishLocation } from "@/types/fish";

interface FishMapProps {
  locations: FishLocation[];
}

interface HeatLayerProps {
  locations: FishLocation[];
}

function HeatLayer({ locations }: HeatLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) {
      return;
    }

    const heatPoints = locations.map((location) => [
      location.latitude,
      location.longitude,
      1,
    ]) as [number, number, number][];

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 60,
      blur: 35,
      maxZoom: 12,
      minOpacity: 0.6,
      gradient: {
        0.2: "yellow",
        0.5: "orange",
        0.8: "red",
        1.0: "darkred",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [locations, map]);

  return null;
}

export default function FishMap({ locations }: FishMapProps) {
  const center: [number, number] =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [41.4993, -81.6944];

  return (
    <div className="h-96 overflow-hidden rounded-3xl border bg-white shadow-sm">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <HeatLayer locations={locations} />
      </MapContainer>
    </div>
  );
}