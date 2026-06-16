"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFishList } from "@/lib/api";
import type { Fish } from "@/types/fish";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFish() {
      try {
        const data = await getFishList();
        setFishList(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadFish();
  }, []);

  useEffect(() => {
    if (fishList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % fishList.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [fishList]);

  if (isLoading || fishList.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7f2] text-gray-950">
        <p className="text-gray-500">Loading FishDex...</p>
      </main>
    );
  }

  const featuredFish = fishList[currentIndex];

  return (
    <main className="min-h-screen bg-[#f5f7f2] text-gray-950">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-700">
              AI-Powered Fishing Encyclopedia
            </p>

            <h1 className="max-w-3xl text-6xl font-bold tracking-tight md:text-7xl">
              Scan fish.
              <br />
              Build your collection.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              FishDex helps anglers identify fish from photos, collect species
              in a personal digital encyclopedia, and explore their distribution
              on an interactive map.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/scan"
                className="rounded-full bg-gray-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Scan Fish
              </Link>

              <Link
                href="/fishdex"
                className="rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold transition hover:border-gray-950"
              >
                Explore FishDex
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white p-6 shadow-2xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-green-100 to-blue-100 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Featured Species</p>

                    <h2 className="text-3xl font-bold">
                      {featuredFish.commonName}
                    </h2>
                  </div>

                  <div className="rounded-full bg-white px-4 py-2 text-sm font-medium shadow">
                    {currentIndex + 1} / {fishList.length}
                  </div>
                </div>

                <div className="flex h-80 items-center justify-center rounded-3xl bg-white p-6 shadow-sm">
                  <Image
                    src={featuredFish.imageUrl}
                    alt={featuredFish.commonName}
                    width={900}
                    height={500}
                    priority
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm italic text-gray-500">
                    {featuredFish.scientificName}
                  </p>

                  <p className="mt-3 text-sm text-gray-600">
                    {featuredFish.description}
                  </p>
                </div>

                <div className="mt-5 flex justify-center gap-2">
                  {fishList.map((fish, index) => (
                    <button
                      key={fish.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? "w-8 bg-gray-950"
                          : "w-2 bg-white"
                      }`}
                      aria-label={`Show ${fish.commonName}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-5 pb-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Photo Recognition</h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Upload a fish image and receive species predictions with
              confidence scores.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Personal FishDex</h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Track discovered species, scan counts, and collection progress.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Distribution Map</h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              View species locations and future catch records on a map.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}