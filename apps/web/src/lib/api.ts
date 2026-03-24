import type { CombinedSearchResponse, SearchQuery } from "@via/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

function withQuery(path: string, query: SearchQuery): string {
  const params = new URLSearchParams({
    destination: query.destination,
    checkIn: query.checkIn,
    checkOut: query.checkOut,
    guests: String(query.guests),
  });

  return `${path}?${params.toString()}`;
}

export async function fetchCombinedResults(
  query: SearchQuery,
): Promise<CombinedSearchResponse> {
  const response = await fetch(
    withQuery(`${API_BASE_URL}/search/combined`, query),
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json() as Promise<CombinedSearchResponse>;
}
