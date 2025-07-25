import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    mode: "light" | "dark";    
};
// Read from localStorage, fallback to "light"
const getInitialTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("theme");
        return stored === "dark" ? "dark" : "light";
    }
    return "light"; // Default for SSR
};

const initialState: ThemeState = {
    mode: getInitialTheme(), // Default theme
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        setTheme(state, action: PayloadAction<"light" | "dark">) {
            state.mode = action.payload
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", action.payload); // Save to localStorage
            }
        },
        toggleTheme(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", state.mode); // Save to localStorage
            }
        }
    }
})

export const {setTheme, toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;