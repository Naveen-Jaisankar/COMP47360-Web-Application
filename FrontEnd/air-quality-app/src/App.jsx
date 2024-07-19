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
import UserDashboard from './pages/UserDashboard';
import { SettingsContext } from './context/SettingsContext';
import Login from './pages/Login';
import Register from './pages/Register';
import MainContent from './components/maincontent';
import { UserPanel } from './pages/UserPanel';
import ForgotPass from './pages/ForgotPassword';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { fontSize } = useContext(SettingsContext);

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ loading }) => {
          if (loading) {
            return <div>Loading...</div>; // pls replace this with some cool loading spinner
          }

          return (
            <BrowserRouter>
              <Navbar />
              <div className="pages" style={{ fontSize: `${fontSize}px` }}>
                <CssBaseline />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path='/forgotpassword' element={<ForgotPass />} />
                    <Route path="/map" element={<ProtectedRoute element={<Map />} />} />
                    <Route path="/user" element={<UserPanel />} />
                  <Route path="/user/dailyform" element={<ProtectedRoute element={<DailyForm />} />} />
                    <Route path="/user/history" element={<ProtectedRoute element={<UserHistory />} />} />
                  </Routes>
                </MainContent>
              </div>
              {/* <Footer/> */}
            </BrowserRouter>
          );
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;