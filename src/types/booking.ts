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

export const BookingListFilter = {
    APPROVED: "APPROVED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    REJECTED: "REJECTED",
    PENDING: "PENDING",
    NOSHOW: "NOSHOW",
    ALL: "ALL"
} as const;

export type BookingListFilter = (typeof BookingListFilter)[keyof typeof BookingListFilter];

export const statusMessageMap: Record<BookingStatus, string> = {
    APPROVED:
        "Are you sure you want to approve this booking?\nThe guest will be notified once approved.",
    REJECTED:
        "Are you sure you want to reject this booking?\nThis action cannot be undone.",
    CANCELLED:
        "Are you sure you want to cancel this booking?\nThis action cannot be undone.",
    NOSHOW:
        "Are you sure you want to mark this booking as a no-show?\nThis may affect the guest and cannot be undone.",
    COMPLETED: "Mark this booking as completed?\nThis action cannot be undone.",
    PENDING: "Are you sure you want to update the booking status?",
};