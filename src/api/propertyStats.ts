import api from "./axios"


export const fetchPropertyStats = async (propertyId: string) => {
    try {
        const res = await api.get(`/properties/stats/${propertyId}`);

        return await res.data;
    } catch (e: any) {

    }
}