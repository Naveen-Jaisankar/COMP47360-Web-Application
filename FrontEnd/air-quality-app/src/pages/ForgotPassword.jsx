import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AirIcon from '@mui/icons-material/Air';
import constant from '../constant';



const ForgotPass = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: connect this with login logic implemented by backend
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        <AirIcon fontSize="large" className='mb-4'></AirIcon>

        <Typography variant="h4" className="mb-4 font-bold">Reset Password</Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" className="mb-3" />

            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4"> {constant.loginConsts.login_btn} </Button>
        </form>
        {/* TODO: this div should be visible only when user clicks on the button*/}
        <div className='reset-message'> Please check your email for reset password link</div>
    </div>
  );
};

export default ForgotPass;