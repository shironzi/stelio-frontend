import api from "./axios"


export const fetchPropertyStats = async (propertyId: string) => {
    try {
        const res = await api.get(`/property/stats/${propertyId}`);

        return await res.data;
    } catch (e: any) {

    }
}