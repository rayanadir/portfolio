import React, { useContext } from 'react';
import '../projects/Projects.scss'
import Project from '../../components/project/Project';
import { PROJECTS } from '../../data/projects';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useDispatch, useSelector } from 'react-redux'
import { globalSearchProjects, setSearchText, setSelectArray } from '../../slices/projectsSlice';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

var searchText = '';
var selectArr = [];

const Projects = () => {
  const { t } = useTranslation();
  const { toggleTheme, theme } = useContext(ThemeContext)

  const [search, setSearch] = React.useState('')
  const [option, setOption] = React.useState([]);

  const dispatch = useDispatch();

  let stackList = useSelector((state) => state.projects.stackList);
  let projects= useSelector((state) =>state.projects.projects);

  let searchTextState= useSelector((state) => state.projects.searchText);
  let selectArrState= useSelector((state) => state.projects.selectArr);
  
  let translatedProjects= PROJECTS.map((project) => {
    return {...project, description: t(project.id)}
  })

  const globalSearch = (searchText, selectArr) => {
    let result;
    if (searchText.length > 0 && selectArr.length === 0) {
      result= translatedProjects.filter((project) => {
        return project.title.toLowerCase().includes(searchText.toLowerCase())
          || project.description.toLowerCase().includes(searchText.toLowerCase())
          || project.stack.some(stack => stack.toLowerCase().includes(searchText.toLowerCase()));
      })
    }
    else if (searchText.length === 0 && selectArr.length > 0) {
      result= translatedProjects.filter((project) => selectArr.every(stack => project.stack.includes(stack)))
    }
    else if (searchText.length > 0 && selectArr.length > 0) {
      let searchResult = translatedProjects.filter((project) => {
        return project.title.toLowerCase().includes(searchText.toLowerCase())
          || project.description.toLowerCase().includes(searchText.toLowerCase())
          || project.stack.some(stack => stack.toLowerCase().includes(searchText.toLowerCase()));
      })
      let selectResult = translatedProjects.filter((project) => selectArr.every(stack => project.stack.includes(stack)));
      result= searchResult.filter(x => selectResult.indexOf(x) !== -1)
    }
    else if (searchText.length === 0 && selectArr.length === 0) {
      result= translatedProjects;
    }
    stackList= [...new Set(result.map((project) => project.stack).flat())];
    dispatch(globalSearchProjects({result,stackList}))
  }

  const select = (e) => {
    selectArr = e.target.value;
    setOption(selectArr);
    dispatch(setSelectArray(selectArr))
    globalSearch(searchText, selectArr)
  };

  const searchProject = (e) => {
    searchText = e.target.value;
    setSearch(searchText);
    dispatch(setSearchText(searchText))
    globalSearch(searchText, selectArr)
  }

  return (
    <section className={`projects ${theme}`} id="projects">
      <h1 className='projects__title'>{t('my_projects')}</h1>
      <div className="projects__search">
        <FormControl id='textformcontrol'>
          <label htmlFor="outlined-size-small">{t('search_project')}</label>
          <TextField
            id="outlined-size-small"
            size="small"
            value={searchTextState}
            onChange={(e) => { searchProject(e) }}
          />
        </FormControl>

        <FormControl sx={{ m: 0, height: "auto" }} id="formcontrol" size="small">
          {/*<InputLabel id="demo-multiple-chip-label"></InputLabel>*/}
          <label htmlFor="demo-multiple-chip">{t('filter')}</label>
          <Select
            
            id="demo-multiple-chip"
            multiple
            onChange={select}
            input={<OutlinedInput id="select-multiple-chip"  />}
            value={selectArrState}
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

      {
        searchTextState.length > 0 || selectArrState.length > 0 ? 
        <p className="projects__result">
          {projects.length > 1 ? t('several_projects', {length:projects.length}) : projects.length===1 ?  t('one_project', {length:projects.length}) : projects.length===0 ? t('no_project') : ""}
        </p> 
        : ""
      }

      <div className="projects__list">
        {projects.map((project) => {
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