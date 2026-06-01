import Link from "next/link";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-black hover:text-black"
    >
      <span className="mr-2">🏠</span>
      Home
    </Link>
  );
}