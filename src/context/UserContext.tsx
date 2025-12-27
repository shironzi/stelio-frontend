import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";

export type UserContextTypes = {
  name: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
};

const defaultData: UserContextTypes = {
  name: "",
  email: "",
  role: "RENTER",
  isAuthenticated: false,
};

type userData = {
  userData: UserContextTypes;
  setUserData: Dispatch<SetStateAction<UserContextTypes>>;
};

export const UserContext = createContext<userData>({
  userData: defaultData,
  setUserData: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserContextTypes>(defaultData);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const ctx = useContext(UserContext);
  return ctx;
};
