import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import AirIcon from '@mui/icons-material/Air';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: connect this with login logic implemented by backend
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

        <AirIcon fontSize="large" className='mb-4'></AirIcon>

        <Typography variant="h4" className="mb-4 font-bold">Log-In</Typography>
        <Typography variant="body1" className="mb-8 text-gray-500"> Where data meets the air </Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" className="mb-3" />

            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" />

            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4"> Login </Button>

            <div className="flex justify-center mt-3">
                <Link href="/register" className="text-blue-500 mt-3">
                    Not a member? Create an account here
                </Link>
            </div>

            {/* TODO:Add forgot password option */}

        </form>
    </div>
  );
};

export default Login;