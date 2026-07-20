"use client";

import dynamic from "next/dynamic";
import type { FishLocation } from "@/types/fish";

const FishMap = dynamic(() => import("./FishMap"), {
  ssr: false,
});

interface FishMapWrapperProps {
  locations: FishLocation[];
}

export default function FishMapWrapper({ locations }: FishMapWrapperProps) {
  return <FishMap locations={locations} />;
}