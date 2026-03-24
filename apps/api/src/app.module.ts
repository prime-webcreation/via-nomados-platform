import { Module } from "@nestjs/common";

import { BookingsModule } from "./bookings/bookings.module";
import { SearchModule } from "./search/search.module";

@Module({
  imports: [SearchModule, BookingsModule],
})
export class AppModule {}
