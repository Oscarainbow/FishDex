import Image from "next/image";
import Link from "next/link";
import type { Fish } from "@/types/fish";

interface FishCardProps {
  fish: Fish;
}

export default function FishCard({ fish }: FishCardProps) {
  return (
    <Link
      href={`/fishdex/${fish.id}`}
      className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={fish.imageUrl}
          alt={fish.commonName}
          fill
          className="object-cover transition group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              fish.collected
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
            }`}
            >
            {fish.collected ? "Collected" : "Not Collected"}
          </span>

        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          {fish.commonName}
        </h2>

        <p className="mt-1 text-sm italic text-gray-500">
          {fish.scientificName}
        </p>
      </div>
    </Link>
  );
}