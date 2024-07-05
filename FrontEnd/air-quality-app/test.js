const axios = require('axios');  // Assuming you have Axios imported or required

const userId = 1;  // Example userId
const quizDate = new Date().toISOString().split('T')[0];  // Current date in YYYY-MM-DD format
const score = 8;

const data = {
  userId: userId,
  quizDate: quizDate,
  score: score
};

// Making the POST request
axios.post('http://localhost:8080/api/dailyquizscores', data, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Success:', response.data);
})
.catch(error => {
  console.error('Error:', error);
});
