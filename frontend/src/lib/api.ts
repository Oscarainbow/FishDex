import type { Fish } from "@/types/fish";

const API_BASE_URL = "http://localhost:8080";

export async function getFishList(): Promise<Fish[]> {
  const response = await fetch(`${API_BASE_URL}/api/fish`);

  if (!response.ok) {
    throw new Error("Failed to fetch fish list");
  }

  return response.json();
}

export async function getFishById(
  id: string
): Promise<Fish> {
  const response = await fetch(
    `${API_BASE_URL}/api/fish/${id}`
  );

  if (!response.ok) {
    throw new Error("Fish not found");
  }

  return response.json();
}