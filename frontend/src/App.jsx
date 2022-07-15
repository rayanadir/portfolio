import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import ProjectPage from './pages/projectPage/ProjectPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { PROJECTS } from './data/projects';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { translateProjects } from './slices/projectsSlice';

const App = ()  => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  React.useEffect(()=> {
  let projects=PROJECTS.map((project) => {
    return {...project, description: t(project.id)}
  })
  dispatch(translateProjects({projects}))
  }, [t, dispatch])
  
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/project/:id' element={<ProjectPage />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
