import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.255.91.2:8080/api/v1',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
});

export default axiosInstance;

