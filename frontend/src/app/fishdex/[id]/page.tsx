"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HomeButton from "@/components/layout/HomeButton";
import BackToFishDexButton from "@/components/layout/BackToFishDexButton";
import FishMapWrapper from "@/components/fish/FishMapWrapper";
import { getFishById } from "@/lib/api";
import type { Fish } from "@/types/fish";
import { useParams } from "next/navigation";

export default function FishDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [fish, setFish] = useState<Fish | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFish() {
      try {
        const data = await getFishById(id);
        setFish(data);
      } catch {
        setError("Fish not found");
      } finally {
        setLoading(false);
      }
    }

    loadFish();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7f2] px-8 py-12 text-gray-950">
        <HomeButton />
        <p className="mt-8 text-gray-500">Loading fish profile...</p>
      </main>
    );
  }

  if (error || !fish) {
    return (
      <main className="min-h-screen bg-[#f5f7f2] px-8 py-12 text-gray-950">
        <HomeButton />
        <p className="mt-8 text-red-600">Fish not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-8 py-12 text-gray-950">
      <div className="mb-8 flex gap-3">
        <HomeButton />
        <BackToFishDexButton />
      </div>

      <section className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
          Fish Profile
        </p>

        <h1 className="mb-2 text-4xl font-bold">{fish.commonName}</h1>

        <p className="mb-8 italic text-gray-500">{fish.scientificName}</p>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex h-96 items-center justify-center rounded-3xl bg-white p-6 shadow-sm">
            <Image
              src={fish.imageUrl}
              alt={fish.commonName}
              width={1000}
              height={500}
              className="max-h-full w-auto object-contain"
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold">Fish Information</h2>

            <p className="mb-6 text-gray-600">{fish.description}</p>

            <div className="space-y-4">
              <p>
                <span className="font-semibold">Habitat:</span> {fish.habitat}
              </p>

              <p>
                <span className="font-semibold">Average Length:</span>{" "}
                {fish.averageLength}
              </p>

              <p>
                <span className="font-semibold">Scanned:</span>{" "}
                {fish.scannedCount}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                {fish.collected ? "Collected ✅" : "Not Collected"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">Distribution Map</h2>
          <FishMapWrapper locations={fish.locations ?? []} />
        </div>
      </section>
    </main>
  );
}