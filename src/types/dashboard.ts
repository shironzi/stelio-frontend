export interface summary {
    monthlyRevenue: number,
    occupancyRate: number,
    monthlyRevenueComparison: number,
    totalRevenue: number,
    activeBookings: number,
    todaysCheckins: number
}

export interface property {
    id: string,
    title: string,
    address: string,
    totalBookings: number,
    totalRevenue: number,
    occupancyRate: string,
    imageUrl: string,
}