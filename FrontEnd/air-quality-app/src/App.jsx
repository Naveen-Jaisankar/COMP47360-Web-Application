import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Map from './pages/Map'
import Settings from './pages/Settings'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages" >
        <Routes style={{margin: "0"}}>
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