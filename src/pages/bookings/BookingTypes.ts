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

    title: string;
    description: string;

    address: string;
    city: string;

    contactPhone: string | null;
    guestNames: string[] | null;
    specialRequest: string | null;

    startDateTime: string;
    endDateTime: string;

    price: number;
    paymentStatus: "PENDING" | "PAID" | "FAILED";
    status: "PENDING" | "CONFIRMED" | "CANCELLED";

    maxGuest: number;
    totalGuests: number | null;

    totalBed: number;
    totalBath: number;
    totalBedroom: number;

    propertyId: string;
    propertyType: "APARTMENT" | "HOUSE" | "VILLA";

    images: string[];
};
