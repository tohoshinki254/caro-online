import { createContext } from "react";

export const AppContext = createContext({
    isLogined: false,
    setIsLogined: (value) => {}
});