import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import Typography from '@mui/material/Typography';
import constants from './../constant';
import axiosInstance from '../axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(userEmail))
    {
      setEmailError('Invalid email address');
    } 
    else
    {

      const registerData = {
        userName: userName, 
        userEmail: userEmail,
        userPassword:userPassword
      };
      
      axiosInstance.post('/auth/registerUser', registerData)
      .then(response =>{
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
      
    }
  };

  const validateEmail = (userEmail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userEmail);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

        <AirIcon fontSize="large" className='mb-4'></AirIcon>
        <Typography variant="h4" className="mb-4 font-bold">{constants.register.title}</Typography>
        <Typography variant="body1" className="mb-8 text-gray-500">{constants.register.body}</Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">

            <div className="mb-4">
            <TextField label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth margin="normal" required/>
            </div>

            <div className="mb-4">
            <TextField 
              label="Email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)} 
              fullWidth 
              error={emailError !== ''}
              helperText={emailError}
              required
            />
            </div>

            <div className="mb-4">
            <TextField label="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} fullWidth type="password" required/>
            </div>

            <Button variant="contained" type="submit" fullWidth> {constants.register.btn} </Button>
        </form>

        <p className="text-center mt-4">Already a member?{' '} 
            <Link to="/login" className="text-blue-500 underline">
            Log-in here
            </Link>
        </p>

        <p className="text-center mt-2">
            By creating your account, you agree to our {' '} 
            <Link to="/terms" className="text-blue-500 underline">T&C</Link>            
        </p>

        {/* //Maybe this can be linked to privacy tab in user dashboard  */}
        <p className="text-center mt-2">
            Learn more about our <Link to="/privacy" className="text-blue-500 underline">privacy</Link> policy here
        </p>
    </div>
  );
};

export default Register;