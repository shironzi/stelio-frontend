import type { BookingStatus } from "../types/booking";
import api from "./axios"


export const bookProperty = async (propertyId: string, start: Date, end: Date) => {
    // Checks Idempotent key
    const storageKey = `booking:${propertyId}:${start.toISOString()}:${end.toISOString()}`;
    try {
        let idempotencyKey = localStorage.getItem(storageKey);

        if (!idempotencyKey) {
            idempotencyKey = crypto.randomUUID();
            localStorage.setItem(storageKey, idempotencyKey);
        }

        const { data } = await api.post(`/bookings/${propertyId}`, { start, end }, {
            headers: {
                'Idempotency-Key': idempotencyKey
            }
        });

        localStorage.removeItem(storageKey);

        return data
    } catch (error: any) {
        if (error.response?.status >= 400 && error.response?.status < 500) {
            localStorage.removeItem(storageKey);
        }

        throw error;
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