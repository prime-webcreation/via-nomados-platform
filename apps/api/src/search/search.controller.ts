import { Controller, Get, Query } from "@nestjs/common";

import { SearchQueryDto } from "./dto/search-query.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("flights")
  async flights(@Query() query: SearchQueryDto) {
    return this.searchService.flights(query);
  }

  @Get("hotels")
  async hotels(@Query() query: SearchQueryDto) {
    return this.searchService.hotels(query);
  }

  @Get("combined")
  async combined(@Query() query: SearchQueryDto) {
    return this.searchService.combined(query);
  }
}
