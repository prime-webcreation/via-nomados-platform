"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useBookingFlowStore } from "@/store/booking-flow.store";

function summaryPrice(
  selected: ReturnType<typeof useBookingFlowStore>["selected"],
): number {
  if (!selected) return 0;
  return selected.type === "flight"
    ? selected.data.price
    : selected.data.totalPrice;
}

export default function BookingPage() {
  const {
    step,
    selected,
    passenger,
    setPassenger,
    nextStep,
    prevStep,
    setPaymentReference,
    paymentReference,
    reset,
  } = useBookingFlowStore();

  const [cardNumber, setCardNumber] = useState("4111111111111111");
  const total = useMemo(() => summaryPrice(selected), [selected]);

  if (!selected) {
    return (
      <div className="container-page rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-amber-900">
          No item selected. Start from the results page.
        </p>
        <Link href="/" className="mt-2 inline-block text-brand-700 underline">
          Go to search
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page space-y-5">
      <h2 className="text-2xl font-bold">Booking flow</h2>
      <p className="text-sm text-slate-600">Step {step} of 3</p>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="font-semibold">Selected {selected.type}</p>
        <p className="text-sm text-slate-600">Total: €{total}</p>
      </section>

      {step === 1 && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold">Passenger details</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="First name"
              value={passenger.firstName}
              onChange={(e) =>
                setPassenger({ ...passenger, firstName: e.target.value })
              }
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Last name"
              value={passenger.lastName}
              onChange={(e) =>
                setPassenger({ ...passenger, lastName: e.target.value })
              }
            />
            <input
              className="rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Email"
              value={passenger.email}
              onChange={(e) =>
                setPassenger({ ...passenger, email: e.target.value })
              }
            />
          </div>
          <button
            onClick={nextStep}
            className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-white"
          >
            Continue to payment
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold">Payment simulation</h3>
          <input
            className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 md:max-w-sm"
            placeholder="Card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="mt-4 flex gap-2">
            <button
              onClick={prevStep}
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              Back
            </button>
            <button
              onClick={() => {
                setPaymentReference(`PMT-${Date.now()}`);
                nextStep();
              }}
              className="rounded-lg bg-brand-600 px-4 py-2 text-white"
            >
              Pay €{total}
            </button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <h3 className="font-semibold text-emerald-900">Confirmed</h3>
          <p className="mt-1 text-sm text-emerald-900">
            Reference: {paymentReference || "N/A"}
          </p>
          <p className="text-sm text-emerald-900">
            Traveler: {passenger.firstName} {passenger.lastName} (
            {passenger.email})
          </p>
          <button
            onClick={() => {
              reset();
            }}
            className="mt-3 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-emerald-900"
          >
            Start new booking
          </button>
        </section>
      )}
    </div>
  );
}
