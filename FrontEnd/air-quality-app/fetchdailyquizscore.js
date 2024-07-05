import axios from 'axios';

axios.get('http://localhost:8080/api/dailyquizscores')
  .then(response => {
    // Handle success, process the data received from backend
    console.log('Data received:', response.data);
    // Update your frontend state or UI with the received data
  })
  .catch(error => {
    // Handle error, log the error message
    console.error('Error fetching data:', error);
    // Handle errors appropriately
  });
