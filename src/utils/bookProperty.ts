import type { BookingStatus } from "../types/booking";
import api from "./axios"


export const bookProperty = async (propertyId: string, start: Date, end: Date) => {
    const { data } = await api.post(`/book/${propertyId}`, { start, end });

    return data
}

export const getBookingsByPropertyId = async (propertyId: string) => {
    const { data } = await api.get(`/book/owner/${propertyId}`)

    return data;
}

export const updateBookingStatus = async (
    bookingId: string,
    status: BookingStatus
) => {
    const { data } = await api.patch(
        `/book/${bookingId}/status`,
        { status }
    );

    return data;
};