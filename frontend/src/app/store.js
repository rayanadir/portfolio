import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { projectsReducer } from "../slices/projectsSlice";
import { languagesReducer } from "../slices/languagesSlice";
import { authReducer } from "../slices/authSlice";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        languages: languagesReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({serializableCheck:false})
})