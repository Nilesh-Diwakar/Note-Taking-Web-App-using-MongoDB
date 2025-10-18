import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";
const initialFont = localStorage.getItem("font-family") || "sans-serif";

const initialState = {
    selectedTheme: initialTheme,
    darkMode: initialTheme === "dark",
    selectedFont: initialFont,
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        setColorTheme: (state, action) => {
            const theme = action.payload;
            state.selectedTheme =theme;
            state.darkMode =theme === "dark"; 
        },
        
        setFontTheme: (state, action) => {
            const fontFamily = action.payload;
            state.selectedFont = fontFamily;
        },
    },
});

export const {setColorTheme, setFontTheme} = themeSlice.actions;
export default themeSlice.reducer;
