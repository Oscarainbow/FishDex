"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HomeButton from "@/components/layout/HomeButton";

export default function ScanPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [hasPrediction, setHasPrediction] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setFileName(file.name);
    setHasPrediction(false);
    setIsLoading(false);
  }

  function handleIdentifyFish() {
    if (!imagePreview) {
      return;
    }

    setIsLoading(true);
    setHasPrediction(false);

    setTimeout(() => {
      setHasPrediction(true);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-[#f5f7f2] px-8 py-10 text-gray-950">
      <HomeButton />

      <section className="mx-auto mt-8 max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
          AI Recognition
        </p>

        <h1 className="mb-4 text-5xl font-bold">Scan Fish</h1>

        <p className="mb-10 max-w-2xl text-gray-600">
          Upload a fish photo and FishDex will identify the species. This page
          currently uses a simulated prediction before the real ML model is
          connected.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <label className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-gray-900">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Uploaded fish preview"
                  width={800}
                  height={500}
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <div>
                  <p className="text-lg font-semibold">Upload Fish Photo</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Click here to choose an image
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <p className="mt-4 text-center text-sm text-gray-500">
              {fileName ? fileName : "No image selected"}
            </p>

            <button
              onClick={handleIdentifyFish}
              disabled={!imagePreview || isLoading}
              className="mt-6 w-full rounded-full bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? "Identifying..." : "Identify Fish"}
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-600">
              Prediction
            </p>

            {isLoading ? (
              <div className="flex h-72 items-center justify-center rounded-3xl bg-gray-50">
                <div className="text-center">
                  <p className="text-xl font-semibold">Identifying Fish...</p>
                  <p className="mt-2 text-gray-500">
                    AI model is analyzing your image.
                  </p>
                </div>
              </div>
            ) : !hasPrediction ? (
              <div className="flex h-72 items-center justify-center rounded-3xl bg-gray-50 text-center text-gray-500">
                Upload an image and click Identify Fish.
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold">Largemouth Bass</h2>

                <p className="mt-2 italic text-gray-500">
                  Micropterus salmoides
                </p>

                <div className="mt-6 rounded-2xl bg-gray-50 p-5">
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="mt-1 text-4xl font-bold">97%</p>
                </div>

                <Link
                  href="/fishdex/largemouth-bass"
                  className="mt-6 inline-flex w-full justify-center rounded-full border border-gray-300 px-6 py-4 text-sm font-semibold transition hover:border-gray-950"
                >
                  View in FishDex
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}