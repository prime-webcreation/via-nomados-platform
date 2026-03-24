"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type SearchFormValues = {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function SearchForm() {
  const router = useRouter();
  const [values, setValues] = useState<SearchFormValues>({
    destination: "Barcelona",
    checkIn: getToday(),
    checkOut: addDays(3),
    guests: 2,
  });

  const canSubmit = useMemo(() => {
    return (
      values.destination.trim().length > 1 && values.checkIn <= values.checkOut
    );
  }, [values]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const params = new URLSearchParams({
      destination: values.destination,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: String(values.guests),
    });

    router.push(`/results?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            Destination
          </span>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={values.destination}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, destination: e.target.value }))
            }
            placeholder="Barcelona"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Check-in</span>
          <input
            type="date"
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={values.checkIn}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, checkIn: e.target.value }))
            }
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Check-out</span>
          <input
            type="date"
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={values.checkOut}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, checkOut: e.target.value }))
            }
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Guests</span>
          <input
            type="number"
            min={1}
            max={9}
            className="rounded-lg border border-slate-300 px-3 py-2"
            value={values.guests}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                guests: Math.max(1, Number(e.target.value || 1)),
              }))
            }
          />
        </label>
      </div>

      <button
        disabled={!canSubmit}
        className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Search trips
      </button>
    </form>
  );
}
