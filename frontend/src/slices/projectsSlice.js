import { createSlice } from "@reduxjs/toolkit";
import { PROJECTS } from "../data/projects";

const initialState = {
    projects: PROJECTS,
    searchProject: [],
    selectOption: [],
    stackList: [...new Set(PROJECTS.map((project) => project.stack).flat())],
    searchText:"",
    selectArr:[]
}

const projectsSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        translateProjects: (state,action) => {
            state.projects=action.payload.projects
        },
        globalSearchProjects: (state,action) => {
            state.projects=action.payload.result;
            state.stackList=action.payload.stackList
        },
        changeLanguage: (state) => {
            state.searchText="";
            state.selectArr=[];
            state.stackList=[...new Set(PROJECTS.map((project) => project.stack).flat())];
            state.projects=PROJECTS;
        },
        clearInputs: (state) => {
            state.searchText="";
            state.selectArr=[];
        },
        setSearchText: (state, action) => {
            state.searchText=action.payload;
        },
        setSelectArray: (state, action) => {
            state.selectArr=action.payload;
        }
    }
})

export const { translateProjects, globalSearchProjects, changeLanguage, setSearchText, setSelectArray, clearInputs } = projectsSlice.actions

export const projectsReducer = projectsSlice.reducer