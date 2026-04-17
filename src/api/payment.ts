import api from "./axios"

export const requestPaymentIntent = async (bookingId: String, storageKey: string) => {
    try {
        let idempotencyKey = localStorage.getItem(storageKey);

        if (!idempotencyKey) {
            idempotencyKey = crypto.randomUUID();
            localStorage.setItem(storageKey, idempotencyKey);
        }

        const { data } = await api.post(`/payments/${bookingId}`, {}, {
            headers: {
                'Idempotency-Key': idempotencyKey
            }
        });

        if (data?.success) {
            localStorage.removeItem(storageKey);
        }

        return data;
    } catch (e: any) {
        console.error(e)
        throw new Error("Something went wrong. Please try again.");
    }
}