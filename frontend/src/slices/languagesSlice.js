import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language:localStorage.getItem('lang') || "fr",
}

const languagesSlice = createSlice({
    name:"languageSlice",
    initialState,
    reducers: {
        changeSelectedLanguage : (state, action) => {
            state.language=action.payload
        }
    }
})

export const { changeSelectedLanguage } = languagesSlice.actions

export const languagesReducer = languagesSlice.reducer