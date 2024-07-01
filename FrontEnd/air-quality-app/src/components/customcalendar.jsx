import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './custom-calendar.css'
import { Paper } from '@mui/material';

const CustomCalendar = () => {
  const [completedDaily, setCompletedDaily] = useState([])

  // possibly fetch the backend here
  const fetchDates = () => {
  // set it as the variable completedDailies
  }

  // mock data for completed quiz
  const completedDailies = [
    new Date("2024-06-13"),
    new Date("2024-06-14")
  ]

  // used so it doesn't infinitely render :(((
  useEffect( () => {
    setCompletedDaily(completedDailies)
  }, [])

  // helper function that checks two dates if they're the same
  const isSameDay = (date1, date2) => {
    if (date1.getDate() === date2.getDate() 
      && date1.getMonth() === date2.getMonth() 
    && date1.getFullYear() && date2.getFullYear() ) {
      return true
    } else {
      return false
    }
  }

  // goes through the completed dailies list and checks it to a date
  const matchCalendar = (date) => {
    for (let i = 0; i < completedDailies.length; i++) {
      const completedDate = completedDailies[i];
      if (isSameDay(completedDate, date)) {
        return true;
      }
    }
    return false;
  };

  // function for the tileContent prop, will match completed daily forms with the calendar
  const renderTileContent = ({date, view}) => {
    if ( view === 'month' && matchCalendar(date)) {
      return <span className="check">✔️</span>
    }
    return null;
  }

  return (
    <Paper>
      <Calendar
      tileContent={renderTileContent} />
    </Paper>
  )
}

export default CustomCalendar;