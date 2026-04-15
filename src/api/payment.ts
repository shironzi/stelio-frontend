import api from "./axios"

export const requestPaymentIntent = async (bookingId: String) => {
    try {
        const res = await api.post(`/payments/${bookingId}`);

        return res.data;
    } catch (e: any) {
        console.error(e)
        throw new Error("Something went wrong. Please try again.");
    }
}