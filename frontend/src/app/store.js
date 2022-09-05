import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { projectsReducer } from "../slices/projectsSlice";
import { languagesReducer } from "../slices/languagesSlice";
import { authReducer } from "../slices/authSlice";
import { userReducer } from "../slices/userSlice";
import { messageReducer } from "../slices/messageSlice";

export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        languages: languagesReducer,
        auth: authReducer,
        user:userReducer,
        message: messageReducer
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({serializableCheck:false})
})