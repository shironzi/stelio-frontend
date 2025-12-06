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