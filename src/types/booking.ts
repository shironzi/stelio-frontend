export interface recentReview {
    name: String,
    status: "COMPLETED" | "CANCELLED" | "NOSHOW" | "PENDING",
    totalStar: Number
}

export interface upcomingBooking {
    name: String,
    CheckInDate: Date,
    duration: Number
}

export interface PropertyStats {
    name: String,
    earningsToday: Number,
    upcomingCheckIns: Number,
    pendingReviews: Number,
    monthlyEarnings: Number,
    occupancyRate: Number,
    pending: Number,
    approved: Number,
    declined: Number,
    cancelled: Number,
    recentReviews: recentReview[],
    upcomingBookings: upcomingBooking[]
}

export const defaultPropertyStats: PropertyStats = {
    name: "",
    earningsToday: 0,
    upcomingCheckIns: 0,
    pendingReviews: 0,
    monthlyEarnings: 0,
    occupancyRate: 0,
    pending: 0,
    approved: 0,
    declined: 0,
    cancelled: 0,
    recentReviews: [],
    upcomingBookings: []
}

export const BookingStatus = {
    APPROVED: "APPROVED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    NOSHOW: "NOSHOW",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface BookingListCard {
    id: string;
    title: string;
    renterName: string;
    totalNights: number;
    startDateTime: string;
    endDateTime: string;
    paymentStatus: "PAID" | "PENDING";
    totalPrice: number;
    totalGuest: number;
    status: BookingStatus;
}