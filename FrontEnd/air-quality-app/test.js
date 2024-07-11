// const axios = require('axios');  // Assuming you have Axios imported or required

// const userId = 1;  // Example userId
// const quizDate = new Date().toISOString().split('T')[0];  // Current date in YYYY-MM-DD format
// const score = 8;

// const data = {
//   userId: userId,
//   quizDate: quizDate,
//   score: score
// };

// // Making the POST request
// axios.post('http://localhost:8080/api/dailyquizscores', data, {
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then(response => {
//   console.log('Success:', response.data);
// })
// .catch(error => {
//   console.error('Error:', error);
// });

import axios from 'axios';

async function sendQuizData() {
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/dailyquizscores',
            data: {
                userId: 1,
                quizDate: "2024-07-08",
                indoorLocation: "Home",
                outdoorLocation: "Park",
                indoorHours: 5,
                outdoorHours: 3
            },
            timeout: 10000 // 10 seconds timeout
        });
        console.log('Response data:', response.data);
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Error: Request timeout. The server took too long to respond.');
        } else {
            console.error('There was an error sending the data!', error);
        }
    }
}

sendQuizData();
