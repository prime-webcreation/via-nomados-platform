import type { Flight, Hotel, SearchQuery } from "@via/types";

export interface GdsProvider {
  searchFlights(query: SearchQuery): Promise<Flight[]>;
  searchHotels(query: SearchQuery): Promise<Hotel[]>;
}
