
import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./noteSlice"
import themeReducer from "./themeSlice"

export const store = configureStore({
    reducer: {
        note: noteReducer,
        theme: themeReducer,
    },
})
