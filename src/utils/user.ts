

import api from "./axios"


export const becomeHost = async (userId: string) => {
    try {
        console.log(userId)
        const { data } = await api.patch(`/users/${userId}`);

        return data;
    } catch (e: any) {

    }
}