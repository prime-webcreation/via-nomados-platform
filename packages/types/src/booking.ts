export type BookingItemType = "flight" | "hotel";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Booking {
  id: string;
  userId: string;
  itemType: BookingItemType;
  itemId: string;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  passengerDetails: PassengerDetails[];
  paymentReference?: string;
  createdAt: string;
}
