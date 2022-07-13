import { createSlice } from "@reduxjs/toolkit";
import { PROJECTS } from "../data/projects";

const initialState = {
    projects : PROJECTS,
    searchProject: [],
    selectOption: []
}

const projectsSlice = createSlice({
    name:"projectSlice",
    initialState,
    reducers:{
        updateProjects: (state,action) => {
            state.projects=action.payload
        },
        searchReducer: (state, action) => {
            state.searchProject= action.payload
        },
        selectReducer: (state, action) => {
            state.selectOption=action.payload
        }
    } 
})

export const { updateProjects, searchReducer, selectReducer } = projectsSlice.actions

export const projectsReducer = projectsSlice.reducer