import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import ProjectPage from './pages/projectPage/ProjectPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'
import { useTranslation } from "react-i18next";

const App = ()  => {
  const { t } = useTranslation();
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
