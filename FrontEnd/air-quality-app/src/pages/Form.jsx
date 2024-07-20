import React, { useState } from 'react';
import axiosInstance from "../../src/axios";

const Form = () => {
  const [userId, setUserId] = useState(1);  // Example userId
  const [quizDate, setQuizDate] = useState(new Date().toISOString().split('T')[0]);  // Current date in YYYY-MM-DD format
  const [score, setScore] = useState(8);

  const handleSubmit = () => {
    const data = {
      userId: 1,
      quizDate: "2024-07-12T00:00:00Z",
      quizScore: 85,
      indoorLocation: "40.759109095634464, -73.98741133008829",
      outdoorLocation: "40.77228005163565, -73.97562338204307",
      indoorHours: 5,
      outdoorHours: 3
  };

    axiosInstance.post('/api/dailyquizscores', data)
      .then(response => {
        console.log("Data sent successfully!", response);
      })
      .catch(error => {
        console.error("There was an error sending the data!", error);
      });
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;