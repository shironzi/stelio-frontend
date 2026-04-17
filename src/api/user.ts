

import api from "./axios"


export const becomeHost = async () => {
    try {
        const { data } = await api.patch(`/users/`);

        return data;
    } catch (e: any) {

    }
}