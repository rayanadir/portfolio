import React from 'react';
import '../projects/Projects.scss'
import Project from '../../components/project/Project';
import { PROJECTS } from '../../data/projects';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../slices/projectsSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

var searchText='';
var selectArr=[];

const Projects = () => {

  const [search, setSearch] = React.useState('')
  const [option, setOption] = React.useState([]);

  const dispatch = useDispatch();
  
  let stackList = useSelector((state) => state.projects.stackList);
  
  const select = (e) => {
    selectArr= e.target.value;
    setOption(selectArr);
    dispatch(getProjects({PROJECTS,searchText,selectArr}));
  };

  const searchProject = (e) => {
    searchText= e.target.value;
    setSearch(searchText);
    dispatch(getProjects({PROJECTS,searchText,selectArr}));
  }

  return (
    <section className="projects" id="projects">
      <h1 className='projects__title'>Mes projets</h1>
      <div className="projects__search">
        <FormControl id='textformcontrol'>
          <TextField
            id="outlined-size-small"
            size="small"
            label="Rechercher un projet"
            value={search}
            onChange={(e) => {searchProject(e)}}
          />
        </FormControl>
    
        <FormControl sx={{ m: 0, height:"auto" }} id="formcontrol" size="small">
          <InputLabel id="demo-multiple-chip-label">Trier</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            onChange={select}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            value={option}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {stackList.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


      <div className="projects__list">
        {PROJECTS.map((project) => {
            return <Project 
                      key={project.title}
                      description={project.description}
                      main_image={project.main_image}
                      stack={project.stack}
                      title={project.title}
                      id={project.id}
                      /> 
          })}
      </div>

        </section>
  )
}

export default Projects