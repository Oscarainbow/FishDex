import Link from "next/link";

export default function BackToFishDexButton() {
  return (
    <Link
      href="/fishdex"
      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-black hover:text-black"
    >
      <span className="mr-2">←</span>
      Back to FishDex
    </Link>
  );
}