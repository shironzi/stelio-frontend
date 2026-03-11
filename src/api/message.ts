import api from "./axios"

export const getChatHeads = async () => {
    const res = await api.get("/messages/");

    return res.data;
}

export const getMessageById = async (messageId: string) => {
    const res = await api.get(`/messages/${messageId}`)

    return res.data
}