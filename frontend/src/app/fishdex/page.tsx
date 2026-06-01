"use client";

import { useState } from "react";
import FishCard from "@/components/fish/FishCard";
import { fishData } from "@/data/fishData";
import HomeButton from "@/components/layout/HomeButton";

const FISH_PER_PAGE = 6;

export default function FishDexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const collectedCount = fishData.filter(
    (fish) => fish.collected
  ).length;

  const filteredFish = fishData.filter((fish) => {
    const keyword = searchTerm.toLowerCase();

    return (
      fish.commonName.toLowerCase().includes(keyword) ||
      fish.scientificName.toLowerCase().includes(keyword)
    );
  });

  const totalPages = Math.ceil(
    filteredFish.length / FISH_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * FISH_PER_PAGE;

  const currentFish = filteredFish.slice(
    startIndex,
    startIndex + FISH_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-8 py-10 text-gray-950">
      <HomeButton />

      <section className="mx-auto mt-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
            Collection
          </p>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h1 className="text-5xl font-bold">
              FishDex
            </h1>

            <p className="max-w-xl text-gray-600 lg:text-right">
              Search by common name or scientific
              name, then open a fish profile to
              view details and distribution.
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            Collection Progress
          </p>

          <p className="text-lg font-semibold">
            {collectedCount} / {fishData.length}
            <span className="ml-2 text-sm font-normal text-gray-500">
              Species Collected
            </span>
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search fish by name or scientific name..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-full border border-gray-300 bg-white px-6 py-4 text-sm shadow-sm outline-none transition focus:border-gray-900"
          />
        </div>

        {/* Fish Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentFish.map((fish) => (
            <FishCard
              key={fish.id}
              fish={fish}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(page - 1, 1)
                )
              }
              disabled={currentPage === 1}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Prev
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(page + 1, totalPages)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm transition hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </main>
  );
}