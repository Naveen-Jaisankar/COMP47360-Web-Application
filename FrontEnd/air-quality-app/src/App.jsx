import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route exact path="/" component={Home} />
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;