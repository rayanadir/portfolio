import { configureStore } from "@reduxjs/toolkit";
import { projectsReducer } from "../slices/projectsSlice";
import { languagesReducer } from "../slices/languagesSlice";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        languages: languagesReducer
    }
})