import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Map from './pages/Map'
import Settings from './pages/Settings'
import { SettingsContext } from './context/SettingsContext';


function App() {

  const {fontSize} = useContext(SettingsContext);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages" style={{ fontSize: `${fontSize}px` }}>
      <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;