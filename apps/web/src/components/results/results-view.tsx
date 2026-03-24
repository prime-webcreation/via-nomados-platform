"use client";

import { useQuery } from "@tanstack/react-query";
import type { Flight, Hotel, SearchQuery } from "@via/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { fetchCombinedResults } from "@/lib/api";
import { useBookingFlowStore } from "@/store/booking-flow.store";

type Filters = {
  maxPrice: number;
  minRating: number;
  maxDuration: number;
};

export function ResultsView({ query }: { query: SearchQuery }) {
  const router = useRouter();
  const setSelected = useBookingFlowStore((state) => state.setSelected);

  const [filters, setFilters] = useState<Filters>({
    maxPrice: 1000,
    minRating: 0,
    maxDuration: 24 * 60,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-combined", query],
    queryFn: () => fetchCombinedResults(query),
  });

  const filteredFlights = useMemo(() => {
    return (data?.flights ?? []).filter(
      (f) =>
        f.price <= filters.maxPrice &&
        f.rating >= filters.minRating &&
        f.durationMinutes <= filters.maxDuration,
    );
  }, [data?.flights, filters]);

  const filteredHotels = useMemo(() => {
    return (data?.hotels ?? []).filter(
      (h) => h.totalPrice <= filters.maxPrice && h.rating >= filters.minRating,
    );
  }, [data?.hotels, filters]);

  function bookFlight(flight: Flight) {
    setSelected({ type: "flight", data: flight });
    router.push("/booking");
  }

  function bookHotel(hotel: Hotel) {
    setSelected({ type: "hotel", data: hotel });
    router.push("/booking");
  }

  if (isLoading) {
    return <p className="text-slate-600">Loading results…</p>;
  }

  if (error) {
    return <p className="text-red-600">Failed to load results.</p>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold">Filters</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <label className="text-sm">
            Max Price (€)
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value || 0),
                }))
              }
            />
          </label>
          <label className="text-sm">
            Min Rating
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={filters.minRating}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: Number(e.target.value || 0),
                }))
              }
            />
          </label>
          <label className="text-sm">
            Max Duration (min)
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="number"
              min={0}
              value={filters.maxDuration}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxDuration: Number(e.target.value || 0),
                }))
              }
            />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-bold text-slate-900">Flights</h3>
        {filteredFlights.map((flight) => (
          <article
            key={flight.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-sm text-slate-600">
                  {flight.from} → {flight.to} · {flight.durationMinutes} min ·{" "}
                  {flight.stops} stop(s)
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-700">€{flight.price}</p>
                <p className="text-xs text-slate-500">Rating {flight.rating}</p>
                <button
                  onClick={() => bookFlight(flight)}
                  className="mt-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700"
                >
                  Book
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-bold text-slate-900">Hotels</h3>
        {filteredHotels.map((hotel) => (
          <article
            key={hotel.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{hotel.name}</p>
                <p className="text-sm text-slate-600">
                  {hotel.city} · {hotel.stars}★ · {hotel.totalNights} nights
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-brand-700">€{hotel.totalPrice}</p>
                <p className="text-xs text-slate-500">Rating {hotel.rating}</p>
                <button
                  onClick={() => bookHotel(hotel)}
                  className="mt-2 rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-700"
                >
                  Book
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
