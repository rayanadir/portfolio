import { createSlice } from "@reduxjs/toolkit";
import { PROJECTS } from "../data/projects";

const initialState = {
    projects: PROJECTS,
    searchProject: [],
    selectOption: [],
    stackList: [...new Set(PROJECTS.map((project) => project.stack).flat())]
}

const projectsSlice = createSlice({
    name: "projectSlice",
    initialState,
    reducers: {
        getProjects: (state, action) => {
            let projects = action.payload.PROJECTS;
            let searchTextValue = action.payload.searchText;
            let selectArrayValue = action.payload.selectArr;
            if (searchTextValue.length > 0 && selectArrayValue.length === 0) {
                projects = PROJECTS.filter((project) => {
                    return project.title.toLowerCase().includes(searchTextValue.toLowerCase())
                        || project.description.toLowerCase().includes(searchTextValue.toLowerCase())
                        || project.stack.some(stack => stack.toLowerCase().includes(searchTextValue.toLowerCase()));
                })
            }
            else if (searchTextValue.length === 0 && selectArrayValue.length > 0) {
                projects = PROJECTS.filter((project) => selectArrayValue.every(stack => project.stack.includes(stack)))
            }
            else if (searchTextValue.length > 0 && selectArrayValue.length > 0) {
                let searchResult = PROJECTS.filter((project) => {
                    return project.title.toLowerCase().includes(searchTextValue.toLowerCase())
                        || project.description.toLowerCase().includes(searchTextValue.toLowerCase())
                        || project.stack.some(stack => stack.toLowerCase().includes(searchTextValue.toLowerCase()));
                })
                let selectResult = PROJECTS.filter((project) => selectArrayValue.every(stack => project.stack.includes(stack)));
                projects = searchResult.filter(x => selectResult.indexOf(x) !== -1)
            }
            else if (searchTextValue.length === 0 && selectArrayValue.length === 0) {
                projects = PROJECTS;
            }
            state.projects = projects;
            state.stackList = [...new Set(projects.map((project) => project.stack).flat())];
            console.log(projects);
        }
    }
})

export const { getProjects } = projectsSlice.actions

export const projectsReducer = projectsSlice.reducer