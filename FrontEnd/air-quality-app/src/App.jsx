import { useContext } from 'react';
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
import { SettingsContext } from './context/SettingsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Starting from './pages/GettingStarted';
import MainContent from './components/maincontent';
import UserDashboard from './pages/UserDashboard';

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
          <Route path="/settings" element={<Settings />} />
          <Route path="/form" element={<Form />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/user/dailyform" element={<DailyForm/>} />
          <Route path="/user/history" element={<UserHistory/>} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/register" element={<Register />} />
          <Route path= "/dashboard" element={<UserDashboard/>} />
        </Routes>
        </MainContent>
      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
