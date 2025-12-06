import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { PropertyProvider } from "./context/PropertyContext";
import { UserProvider } from "./context/UserContext";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <PropertyProvider>
                <App />
            </PropertyProvider>
        </UserProvider>
    </StrictMode>,
)
