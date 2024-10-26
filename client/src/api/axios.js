import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // Adjust to your server's URL
  withCredentials: true, // Enable session handling
});

export default api;
