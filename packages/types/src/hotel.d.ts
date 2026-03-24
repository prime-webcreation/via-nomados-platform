export interface Hotel {
    id: string;
    provider: string;
    name: string;
    city: string;
    address: string;
    stars: number;
    rating: number;
    amenities: string[];
    pricePerNight: number;
    currency: string;
    totalNights: number;
    totalPrice: number;
    thumbnailUrl?: string;
}
