import type { Booking } from "../pages/bookings/BookingTypes";
import type { BookingStatus } from "../types/booking";
import api from "./axios"


export const bookProperty = async (propertyId: string, details: Booking) => {
    try {
        const { data } = await api.post(`/bookings/${propertyId}/book`, details);

        return data
    } catch (error: any) {
        return error?.response?.data;
    }
}

export const reserveProperty = async (propertyId: string, details: Booking) => {
    try {
        const { data } = await api.post(`/bookings/${propertyId}/reserve`, details,);

        return data
    } catch (error: any) {
        return error?.response?.data;
    }
}

export const getBookingsByPropertyId = async (propertyId: string) => {
    const { data } = await api.get(`/properties/${propertyId}/bookings`)

    return data;
}

export const updateBookingStatus = async (
    bookingId: string,
    status: BookingStatus
) => {
    const { data } = await api.patch(
        `/bookings/${bookingId}`,
        { status }
    );

    return data;
};

export const getMyBookings = async () => {
    const { data } = await api.get("/bookings/");

    return data;
}

export const cancelBooking = async (bookingId: String) => {
    const { data } = await api.patch(`/bookings/${bookingId}/cancel`);

    return data;
}