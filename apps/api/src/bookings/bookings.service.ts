import { Injectable } from "@nestjs/common";
import type { Booking } from "@via/types";

import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingsService {
  private readonly bookings = new Map<string, Booking>();

  create(input: CreateBookingDto): Booking {
    const id = `bkg_${Date.now()}`;

    const booking: Booking = {
      id,
      userId: input.userId,
      itemType: input.itemType,
      itemId: input.itemId,
      totalPrice: input.totalPrice,
      currency: input.currency,
      status: "confirmed",
      passengerDetails: input.passengerDetails,
      paymentReference: input.paymentReference ?? `PMT-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.bookings.set(id, booking);
    return booking;
  }

  findAll(): Booking[] {
    return Array.from(this.bookings.values());
  }
}
