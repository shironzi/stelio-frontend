import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
  createContext,
  useContext,
} from "react";

export type PropertyTypes = {
  title: string;
  price: number;
  address: string;
  description: string;
  maxGuest: number;
  totalBedroom: number;
  totalBed: number;
  totalBath: number;
  city: string;
  propertyType: "APARTMENT" | "HOUSE" | "VILLA" | "CABIN";
  image: File[];
};

type PropertyContextType = {
  data: PropertyTypes;
  setData: Dispatch<SetStateAction<PropertyTypes>>;
};

export const propertyData: PropertyTypes = {
  title: "",
  price: 0,
  address: "",
  description: "",
  maxGuest: 1,
  totalBedroom: 0,
  totalBed: 0,
  totalBath: 1,
  city: "",
  propertyType: "APARTMENT",
  image: [],
};

export const PropertyContext = createContext<PropertyContextType>({
  data: propertyData,
  setData: () => {},
});

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PropertyTypes>(propertyData);

  return (
    <PropertyContext.Provider value={{ data, setData }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const ctx = useContext(PropertyContext);
  return ctx;
};
