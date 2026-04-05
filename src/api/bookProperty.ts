import type { Booking } from "../pages/bookings/BookingTypes";
import type { BookingStatus } from "../types/booking";
import api from "./axios"


export const bookProperty = async (propertyId: string, details: Booking) => {
    // Checks Idempotent key
    const storageKey = `booking:${propertyId}:${details.start}:${details.end}:book`;
    let idempotencyKey = localStorage.getItem(storageKey);

    if (!idempotencyKey) {
        idempotencyKey = crypto.randomUUID();
        localStorage.setItem(storageKey, idempotencyKey);
    }

    try {
        const { data } = await api.post(`/bookings/${propertyId}/book`, details, {
            headers: {
                'Idempotency-Key': idempotencyKey
            }
        });

        if (data?.success) {
            localStorage.removeItem(storageKey);
        }

        return data
    } catch (error: any) {
        if (error.response?.status >= 400 && error.response?.status < 500) {
            localStorage.removeItem(storageKey);
        }

        return error?.response?.data;
    }
}

export const reserveProperty = async (propertyId: string, details: Booking) => {
    // Checks Idempotent key
    const storageKey = `booking:${propertyId}:${details.start}:${details.end}:reserve`;
    let idempotencyKey = localStorage.getItem(storageKey);

    if (!idempotencyKey) {
        idempotencyKey = crypto.randomUUID();
        localStorage.setItem(storageKey, idempotencyKey);
    }

    try {
        const { data } = await api.post(`/bookings/${propertyId}/reserve`, details, {
            headers: {
                'Idempotency-Key': idempotencyKey
            }
        });

        if (data?.success) {
            localStorage.removeItem(storageKey);
        }

        return data
    } catch (error: any) {
        if (error.response?.status >= 400 && error.response?.status < 500) {
            localStorage.removeItem(storageKey);
        }

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

export const payBooking = async (bookingId: String, amount: number) => {
    const { data } = await api.post(`/payments/${bookingId}`, { amount });

    return data;
}