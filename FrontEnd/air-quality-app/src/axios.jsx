import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;

