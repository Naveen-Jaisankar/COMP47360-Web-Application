import { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AirIcon from '@mui/icons-material/Air';
import {useNavigate} from 'react-router-dom';

import constant from '../constant';
import axiosInstance from '../axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(userEmail)) {
      setEmailError('Invalid email address');
    } else {
      const loginData = {
        userEmail: userEmail,
        userPassword: userPassword
      };

      axiosInstance.post('/auth/signin', loginData)
      .then(response =>{
        const token = response.data.token;
        login(token);
        if(response.status === 200)
        {
          navigate('/user')
        }
      })
      .catch(error =>{
        console.log(error)
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

        <Typography variant="h4" className="mb-4 font-bold">{constant.loginConsts.login}</Typography>
        <Typography variant="body1" className="mb-8 text-gray-500"> {constant.loginConsts.login_body} </Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <TextField 
              label="Email" 
              type="email" 
              value={userEmail} 
              onChange={(e) => setUserEmail(e.target.value)} 
              fullWidth 
              margin="normal" 
              className="mb-3" 
              error={emailError !== ''}
              helperText={emailError}
              required
            />

            <TextField label="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} fullWidth margin="normal" required/>

            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4"> {constant.loginConsts.login_btn} </Button>

            <div className="flex flex-col items-center justify-center mt-3">
                <Link href="/register" className="text-blue-500 mt-3 p-2">
                  {constant.loginConsts.create_acnt}
                </Link>

                <Link href="/forgotpassword" className="text-blue-500 mt-3 p-2">
                  {constant.loginConsts.forgot_pass}
                </Link>
            </div>
        </form>
    </div>
  );
};

export default Login;