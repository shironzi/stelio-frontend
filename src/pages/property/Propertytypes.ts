export type PropertyType =
    | "APARTMENT"
    | "HOUSE"
    | "VILLA"
    | "CABIN";

export type PropertyTypesView = {
    id?: string;
    title: string;
    price: number;
    address: string;
    description: string;
    status?: string;
    maxGuest: number;
    totalBedroom: number;
    totalBed: number;
    totalBath: number;
    totalNights?: number;
    city: string;
    propertyType: PropertyType;
    image: string[] | File[];
    isFavorite?: boolean;
};

export const PropertyTypesViewDefaultData: PropertyTypesView = {
    id: "",
    title: "",
    price: 0,
    address: "",
    description: "",
    maxGuest: 0,
    totalBedroom: 0,
    status: "Available",
    totalBed: 0,
    totalBath: 0,
    city: "",
    totalNights: 1,
    propertyType: "APARTMENT",
    image: [],
    isFavorite: false
};

export type PropertyCardActions = {
    onDelete?: (propertyId: string) => void;
    onEdit?: (propertyId: string) => void;
    onFavorite?: (propertyId: string) => void;
}

export type PropertyCardSettings = {
    mode: 'home' | 'manage' | 'booking';
}