import React, {useState} from 'react';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';

const GeneralHealthSection = ({ nextStep }) => {
  const [respCondition, setRespCondition] = useState('No');

  const handleRespChange = (event) => {
    setRespCondition(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Getting Started</h2>
      <p className="mb-6 text-center">Your answers to the following questions will be used to make your own health profile.</p>
      <FormControl component="fieldset">
        <FormLabel component="legend" className="mb-4 text-center">Do you have any pre-existing respiratory conditions?</FormLabel>
        <RadioGroup value={respCondition} onChange={handleRespChange}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
        {respCondition === 'Yes' && (
            <div className='mt-4'>
                <FormLabel component="legend" className="mb-4 text-center">Do you have any pre-existing respiratory conditions?</FormLabel>
                <FormGroup>
                    <FormControlLabel value="Asthma" control={<Checkbox />} label="Asthma" />
                    <FormControlLabel value="Long Covid" control={<Checkbox />} label="Long Covid" />
                    <FormControlLabel value="COPD" control={<Checkbox />} label="COPD" />
                    <FormControlLabel value="Lung Cancer" control={<Checkbox />} label="Lung Cancer" />
                </FormGroup>
            </div>
        )}
      </FormControl>
      <div className="flex justify-center mt-6">
        <Button variant="contained" color="primary" onClick={nextStep}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default GeneralHealthSection;
