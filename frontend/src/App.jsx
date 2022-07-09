import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import Project from './pages/project/Project';
import Header from './components/header/Header';
import Footer from './components/footer/Footer'

const App = ()  => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/project/:id' element={<Project />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
