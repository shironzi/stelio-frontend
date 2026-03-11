import api from "./axios"

export const addFavorite = async (propertyId: string) => {
    const { data } = await api.post(`/favorite/${propertyId}`);

    console.log(data)

    return data;
}

export const removeFavorite = async (propertyId: string) => {
    const { data } = await api.delete(`/favorite/${propertyId}`);

    console.log(data)

    return data;
}