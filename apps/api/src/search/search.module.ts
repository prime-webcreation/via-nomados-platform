import { Module } from "@nestjs/common";

import { MockGdsProvider } from "./providers/mock-gds.provider";
import { GDS_PROVIDER } from "./providers/provider.tokens";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";

@Module({
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: GDS_PROVIDER,
      useClass: MockGdsProvider,
    },
  ],
})
export class SearchModule {}
