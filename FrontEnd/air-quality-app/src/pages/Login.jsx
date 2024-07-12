import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AirIcon from '@mui/icons-material/Air';
import constant from '../constant';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      // TODO: connect this with login logic implemented by backend
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
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
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth 
              margin="normal" 
              className="mb-3" 
              error={emailError !== ''}
              helperText={emailError}
              required
            />

            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" required/>

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