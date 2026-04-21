

import api from "./axios"


export const becomeHost = async () => {
    try {
        const { data } = await api.patch(`/users/`);

        return data;
    } catch (e: any) {

    }
}

export const getProfile = async () => {
    const { data } = await api.get(`/users/profile`);

    return data;
}

export const uploadProfilePicture = async (file: File) => {
    const formData = new FormData();

    formData.append("picture", file)

    const { data } = await api.post(`/users/profile`, formData);

    return data
}