export interface Flight {
    id: string;
    provider: string;
    airline: string;
    from: string;
    to: string;
    departureAt: string;
    arrivalAt: string;
    durationMinutes: number;
    stops: number;
    cabinClass: "economy" | "premium_economy" | "business" | "first";
    price: number;
    currency: string;
    rating: number;
}
