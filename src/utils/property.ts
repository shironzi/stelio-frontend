import type { PropertyTypes } from "../context/PropertyContext";
import api from "./axios";

export const createProperty = async (info: PropertyTypes) => {

    try {
        const formData = new FormData();
        formData.append("title", info.title);
        formData.append("description", info.description);
        formData.append("price", info.price.toString())
        formData.append("maxGuest", info.maxGuest.toString());
        formData.append("totalBedroom", info.totalBedroom.toString());
        formData.append("totalBed", info.totalBed.toString());
        formData.append("totalBath", info.totalBath.toString());
        formData.append("city", info.city)
        formData.append("propertyType", info.propertyType);
        formData.append("address", info.address)

        if (info.image && info.image.length > 0) {
            info.image.forEach((image) => {
                formData.append("image", image);
            });
        }

        const res = await api.post("/property", formData);

        return res.data;
    } catch (e: any) {
        console.error(e)
        throw new Error("Something went wrong. Please try again.");
    }

}

export const getMyProperties = async () => {
    try {
        const res = await api.get("/property/my-properties")

        return await res.data;
    } catch (e: any) {
        console.error(e)
    }
}

export const getProperties = async () => {
    const res = await api.get("/property/");

    return await res.data;
}

export const getPropertyById = async (id: string) => {
    const res = await api.get(`/property/${id}`)
    return await res.data;
}