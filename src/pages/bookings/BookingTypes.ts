export type Tab = {
    tab:
    | "Dashboard"
    | "Calendar"
    | "Bookings"
    | "Earnings"
    | "Reviews"
    | "Messages"
    | "Settings"
}

export const defaultTab: Tab = {
    tab: "Dashboard"
}

export type Booking = {
    id: string;

    // Property Details
    propertyId: string;
    title: string;
    description: string;
    address: string;
    city: string;
    price: number;
    maxGuest: number;
    totalBed: number;
    totalBath: number;
    totalBedroom: number;
    paymentStatus: "PENDING" | "PAID" | "FAILED";
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    propertyType: "APARTMENT" | "HOUSE" | "VILLA";
    discount: number;

    // Guest
    contactPhone: string | null;
    guestNames: string[] | null;
    specialRequest: string | null;
    totalGuests: number | null;
    coupon: string;

    // Schedule
    startDateTime: string;
    endDateTime: string;

    images: string[];
};
