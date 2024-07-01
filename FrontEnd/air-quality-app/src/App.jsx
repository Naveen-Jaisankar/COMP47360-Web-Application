import React, { useContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Map from './pages/Map'
import Form from './pages/Form'
import Settings from './pages/Settings'
import DailyForm from './pages/DailyForm';
import Privacy from './pages/Privacy';
import UserHistory from './pages/UserHistory';
import UserDashboard from './pages/UserDashboard';
import { SettingsContext } from './context/SettingsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Starting from './pages/GettingStarted';
import MainContent from './components/maincontent';
import { UserPanel } from './pages/UserPanel';

function App() {

  const {fontSize} = useContext(SettingsContext);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages" style={{ fontSize: `${fontSize}px` }}>
      <CssBaseline />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/user/gettingstarted" element={<Starting />}></Route>
          <Route path="/user" element={<UserPanel/>} />
          <Route path="/user/dailyform" element={<DailyForm/>} />
          <Route path="/user/userhistory" element={<UserHistory/>} />
          <Route path="/userdashboard" element={<UserDashboard/>} />
          <Route path="/privacy" element={<Privacy/>} />
        </Routes>
      </MainContent>
      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
