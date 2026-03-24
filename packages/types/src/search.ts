import type { Flight } from "./flight";
import type { Hotel } from "./hotel";

export interface SearchQuery {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface CombinedSearchResponse {
  flights: Flight[];
  hotels: Hotel[];
}
