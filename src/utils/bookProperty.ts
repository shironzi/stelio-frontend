import api from "./axios"


export const bookProperty = async (propertyId: string, start: Date, end: Date) => {
    const { data } = await api.post(`/book/${propertyId}`, { start, end });

    return data
}