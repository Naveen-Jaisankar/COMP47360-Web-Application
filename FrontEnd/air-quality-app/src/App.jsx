import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Map from './pages/Map'
import Form from './pages/Form'
import Settings from './pages/Settings'
import { SettingsContext } from './context/SettingsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Starting from './pages/GettingStarted';

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
          <Route path="/form" element={<Form />} />
          <Route path="/login" element = {<Login/>}></Route>
          <Route path="/register" element={ <Register/>}></Route>
          <Route path="/gettingstarted" element={<Starting />}></Route>
        </Routes>
      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;