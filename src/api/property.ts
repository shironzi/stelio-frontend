import type { PropertyTypes } from "../context/PropertyContext";
import api from "./axios";

export const createProperty = async (info: PropertyTypes) => {
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

    if (info.images && info.images.length > 0) {
        info.images.forEach((image) => {
            if (image instanceof File) {
                formData.append(`images`, image);
            }
        });
    }

    try {
        const res = await api.post("/properties", formData);

        return res.data;
    } catch (e: any) {
        console.error(e)
        throw new Error("Something went wrong. Please try again.");
    }
}


export const updateProperty = async (info: PropertyTypes, propertyId: string) => {
    const formData = new FormData();

    formData.append("title", info.title);
    formData.append("description", info.description);
    formData.append("price", info.price.toString());
    formData.append("maxGuest", info.maxGuest.toString());
    formData.append("totalBedroom", info.totalBedroom.toString());
    formData.append("totalBed", info.totalBed.toString());
    formData.append("totalBath", info.totalBath.toString());
    formData.append("city", info.city);
    formData.append("propertyType", info.propertyType);
    formData.append("address", info.address);

    if (info.images && info.images.length > 0) {
        info.images.forEach((image) => {
            if (image instanceof File) {
                formData.append(`newImages`, image);
            }
        });
    }

    if (info.deletedImages && info.deletedImages.length > 0) {
        info.deletedImages.forEach((image) => {
            formData.append(`removedImages`, image);
        });
    }

    try {
        const res = await api.post(`/properties/${propertyId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data;
    } catch (e: any) {
        console.error(e);
        throw new Error("Something went wrong. Please try again.");
    }
};

export const getMyProperties = async () => {
    try {
        const res = await api.get("/properties/my-properties")

        return await res.data;
    } catch (e: any) {
        console.error(e)
    }
}

export const getProperties = async () => {
    const res = await api.get("/properties/");

    return await res.data;
}

export const getPropertyById = async (id: string) => {
    const res = await api.get(`/properties/${id}`)
    return await res.data;
}

export const deleteProperty = async (id: String) => {
    const res = await api.delete(`/properties/${id}`);
    return await res.data;
}