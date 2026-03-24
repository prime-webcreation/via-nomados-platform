import type { SearchQuery } from "@via/types";

import { ResultsView } from "@/components/results/results-view";

type PageProps = {
  searchParams: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
};

function resolveQuery(searchParams: PageProps["searchParams"]): SearchQuery {
  const today = new Date().toISOString().slice(0, 10);
  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 3);

  return {
    destination: searchParams.destination ?? "Barcelona",
    checkIn: searchParams.checkIn ?? today,
    checkOut: searchParams.checkOut ?? checkOut.toISOString().slice(0, 10),
    guests: Number(searchParams.guests ?? 2),
  };
}

export default function ResultsPage({ searchParams }: PageProps) {
  const query = resolveQuery(searchParams);

  return (
    <div className="container-page">
      <h2 className="mb-4 text-2xl font-bold">
        Results for {query.destination}
      </h2>
      <ResultsView query={query} />
    </div>
  );
}
