import type { BookingStatus } from "../types/booking";
import api from "./axios"


export const bookProperty = async (propertyId: string, start: Date, end: Date) => {
    // Checks Idempotent key
    let idempotentKey = localStorage.getItem("reqBookingKey");

    if (!idempotentKey) {
        idempotentKey = crypto.randomUUID();
        localStorage.setItem("bookingkey", idempotentKey);
    }

    const { data } = await api.post(`/bookings/${propertyId}`, { start, end }, {
        headers: {
            'Idempotency-Key': idempotentKey
        }
    });

    return data
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