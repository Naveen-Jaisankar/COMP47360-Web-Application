import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../static/custom-calendar.css';
import { Paper } from '@mui/material';

const CustomCalendar = () => {
  const [completedDaily, setCompletedDaily] = useState([]);
  const [dateStatuses, setDateStatuses] = useState({}); // State for storing date statuses

  // Fetch dates and their statuses from back end
  useEffect(() => {
    // Example mock data for completed dates and statuses
    const mockDates = [
      { date: new Date("2024-07-13"), status: 'success' }, // Green
      { date: new Date("2024-07-14"), status: 'failure' }  // Red
    ];

    const statusMap = {};
    mockDates.forEach(({ date, status }) => {
      const key = date.toDateString(); // Use a unique key for each date
      statusMap[key] = status;
    });

    setCompletedDaily(mockDates.map(({ date }) => date));
    setDateStatuses(statusMap);
  }, []);

  // Helper function to check if two dates are the same
  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  // Function to match calendar date with completed daily dates and their statuses
  const matchCalendar = (date) => {
    const key = date.toDateString();
    return dateStatuses[key];
  };

  // Render tile content with color-based status
  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const status = matchCalendar(date);
      if (status) {
        return (
          <div className={`status ${status}`}>
            {status === 'success' ? '✔️' : '❌'}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Paper>
      <Calendar
        tileContent={renderTileContent}
      />
    </Paper>
  );
}

export default CustomCalendar;
