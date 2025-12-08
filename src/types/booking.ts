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