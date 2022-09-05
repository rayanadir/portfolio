import './App.scss';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import ProjectPage from './pages/projectPage/ProjectPage';
import Contact from './pages/contact/Contact'
import Auth from './pages/auth/Auth';
import Conversation from './pages/conversation/Conversation'
import Profile from './pages/profile/Profile';
import Error from './pages/error/Error';
import About from './pages/about/About';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { PROJECTS } from './data/projects';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { translateProjects } from './slices/projectsSlice';
import { ThemeProvider } from './context/ThemeContext';
import Reset from './pages/reset/Reset';
import Settings from './pages/settings/Settings';
import MessagePage from './pages/messagePage/MessagePage';
import SimpleMessage from './pages/simpleMessage/SimpleMessage';

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
            <Route path="/contact" element={<Contact />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/message/:id" element={<SimpleMessage />} />
            <Route path='/authentication' element={<Auth />} />
            <Route path='/reset/:token' element={<Reset />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/conversation/:id' element={<Conversation />} />
            <Route path='/about' element={<About />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
