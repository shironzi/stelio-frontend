import api from "./axios"

export const getChatHeads = async () => {
    const res = await api.get("/messages/");

    return res.data;
}