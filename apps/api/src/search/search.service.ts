import { Inject, Injectable } from "@nestjs/common";
import type {
  CombinedSearchResponse,
  Flight,
  Hotel,
  SearchQuery,
} from "@via/types";

import { SearchQueryDto } from "./dto/search-query.dto";
import { GdsProvider } from "./providers/gds-provider.interface";
import { GDS_PROVIDER } from "./providers/provider.tokens";

@Injectable()
export class SearchService {
  constructor(
    @Inject(GDS_PROVIDER) private readonly gdsProvider: GdsProvider,
  ) {}

  async flights(query: SearchQueryDto): Promise<Flight[]> {
    return this.gdsProvider.searchFlights(this.normalizeQuery(query));
  }

  async hotels(query: SearchQueryDto): Promise<Hotel[]> {
    return this.gdsProvider.searchHotels(this.normalizeQuery(query));
  }

  async combined(query: SearchQueryDto): Promise<CombinedSearchResponse> {
    const normalized = this.normalizeQuery(query);
    const [flights, hotels] = await Promise.all([
      this.gdsProvider.searchFlights(normalized),
      this.gdsProvider.searchHotels(normalized),
    ]);

    return { flights, hotels };
  }

  private normalizeQuery(query: SearchQueryDto): SearchQuery {
    return {
      destination: query.destination ?? "Barcelona",
      checkIn: query.checkIn ?? this.today(),
      checkOut: query.checkOut ?? this.inDays(3),
      guests: query.guests ?? 2,
    };
  }

  private today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private inDays(days: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }
}
