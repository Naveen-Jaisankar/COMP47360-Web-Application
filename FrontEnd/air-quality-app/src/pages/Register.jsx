import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AirIcon from '@mui/icons-material/Air';
import Typography from '@mui/material/Typography';
import constants from './../constant';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO:  connect this with login logic implemented by backend
    console.log('Form submitted:', { username, email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

        <AirIcon fontSize="large" className='mb-4'></AirIcon>
        <Typography variant="h4" className="mb-4 font-bold">{constants.register.title}</Typography>
        <Typography variant="body1" className="mb-8 text-gray-500">{constants.register.body}</Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">

            <div className="mb-4">
            <TextField label="User Name" value={username} onChange={(e) => setUserName(e.target.value)} fullWidth margin="normal" />
            </div>

            <div className="mb-4">
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            </div>

            <div className="mb-4">
            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" />
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
        {/* Add message popup tpo onitfy user to check their email for */ }
        <p className="text-center mt-2">
            Learn more about our <Link to="/privacy" className="text-blue-500 underline">privacy</Link> policy here
        </p>
    </div>
  );
};

export default Register;