import React from 'react'
import { DateCalendar, DateTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Paper } from '@mui/material';

const CustomCalendar = () => {
    const [value, setValue] = React.useState(dayjs("2024-06-19"))

    return (
        <>
        <Paper elevation={5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        
        {/* To do: join backend here */}
        <DateCalendar/>
        
        </LocalizationProvider>
        </Paper>
        </>
    )
}


export default CustomCalendar;


