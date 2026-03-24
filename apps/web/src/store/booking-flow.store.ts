"use client";

import type { Flight, Hotel } from "@via/types";
import { create } from "zustand";

type Passenger = {
  firstName: string;
  lastName: string;
  email: string;
};

type Bookable =
  | {
      type: "flight";
      data: Flight;
    }
  | {
      type: "hotel";
      data: Hotel;
    };

type BookingFlowState = {
  step: 1 | 2 | 3;
  selected?: Bookable;
  passenger: Passenger;
  paymentReference?: string;
  setSelected: (selected: Bookable) => void;
  setPassenger: (passenger: Passenger) => void;
  setPaymentReference: (reference: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

const initialPassenger: Passenger = {
  firstName: "",
  lastName: "",
  email: "",
};

export const useBookingFlowStore = create<BookingFlowState>((set) => ({
  step: 1,
  passenger: initialPassenger,
  setSelected: (selected) => set({ selected }),
  setPassenger: (passenger) => set({ passenger }),
  setPaymentReference: (paymentReference) => set({ paymentReference }),
  nextStep: () =>
    set((state) => ({
      step: Math.min(3, state.step + 1) as 1 | 2 | 3,
    })),
  prevStep: () =>
    set((state) => ({
      step: Math.max(1, state.step - 1) as 1 | 2 | 3,
    })),
  reset: () =>
    set({
      step: 1,
      passenger: initialPassenger,
      selected: undefined,
      paymentReference: "",
    }),
}));
