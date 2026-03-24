import { Injectable } from "@nestjs/common";
import type { Flight, Hotel, SearchQuery } from "@via/types";

import { GdsProvider } from "./gds-provider.interface";

@Injectable()
export class MockGdsProvider implements GdsProvider {
  async searchFlights(query: SearchQuery): Promise<Flight[]> {
    const destination = (query.destination || "Barcelona").toLowerCase();

    const flights: Flight[] = [
      {
        id: "flt_101",
        provider: "MockAmadeus",
        airline: "SkyWays",
        from: "FRA",
        to: destination.toUpperCase().slice(0, 3),
        departureAt: `${query.checkIn}T08:30:00.000Z`,
        arrivalAt: `${query.checkIn}T11:15:00.000Z`,
        durationMinutes: 165,
        stops: 0,
        cabinClass: "economy",
        price: 189,
        currency: "EUR",
        rating: 4.2,
      },
      {
        id: "flt_202",
        provider: "MockAmadeus",
        airline: "EuroJet",
        from: "MUC",
        to: destination.toUpperCase().slice(0, 3),
        departureAt: `${query.checkIn}T13:10:00.000Z`,
        arrivalAt: `${query.checkIn}T17:40:00.000Z`,
        durationMinutes: 270,
        stops: 1,
        cabinClass: "economy",
        price: 149,
        currency: "EUR",
        rating: 3.9,
      },
      {
        id: "flt_303",
        provider: "MockDuffel",
        airline: "Nimbus Air",
        from: "BER",
        to: destination.toUpperCase().slice(0, 3),
        departureAt: `${query.checkIn}T06:45:00.000Z`,
        arrivalAt: `${query.checkIn}T09:25:00.000Z`,
        durationMinutes: 160,
        stops: 0,
        cabinClass: "business",
        price: 429,
        currency: "EUR",
        rating: 4.8,
      },
    ];

    return flights;
  }

  async searchHotels(query: SearchQuery): Promise<Hotel[]> {
    const destination = query.destination || "Barcelona";
    const totalNights = this.diffNights(query.checkIn, query.checkOut);

    const hotels: Hotel[] = [
      {
        id: "htl_11",
        provider: "MockAmadeus",
        name: `${destination} Urban Suites`,
        city: destination,
        address: "City Center 10",
        stars: 4,
        rating: 4.4,
        amenities: ["WiFi", "Breakfast", "Gym"],
        pricePerNight: 129,
        currency: "EUR",
        totalNights,
        totalPrice: 129 * totalNights,
      },
      {
        id: "htl_22",
        provider: "MockDuffel",
        name: `${destination} Grand Resort`,
        city: destination,
        address: "Beach Avenue 5",
        stars: 5,
        rating: 4.8,
        amenities: ["Pool", "Spa", "Breakfast"],
        pricePerNight: 279,
        currency: "EUR",
        totalNights,
        totalPrice: 279 * totalNights,
      },
      {
        id: "htl_33",
        provider: "MockAmadeus",
        name: `${destination} Budget Inn`,
        city: destination,
        address: "Station Street 2",
        stars: 3,
        rating: 3.9,
        amenities: ["WiFi"],
        pricePerNight: 79,
        currency: "EUR",
        totalNights,
        totalPrice: 79 * totalNights,
      },
    ];

    return hotels;
  }

  private diffNights(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const ms = end.getTime() - start.getTime();
    const nights = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    return Number.isFinite(nights) ? nights : 1;
  }
}
