import './App.scss';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import ProjectPage from './pages/projectPage/ProjectPage';
import Auth from './pages/auth/Auth';
import Error from './pages/error/Error';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { PROJECTS } from './data/projects';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { translateProjects } from './slices/projectsSlice';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    let projects = PROJECTS.map((project) => {
      return { ...project, description: t(project.id) }
    })
    dispatch(translateProjects({ projects }))
  }, [t, dispatch])
  return (
    <React.Fragment>
      <ThemeProvider>
        <div className="content-wrap">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/project/:id' element={<ProjectPage />} />
            <Route path='/auth' element={<Auth />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
