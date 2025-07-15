import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // ✅ or your deployed backend URL
  withCredentials: true, // if you're using cookies/auth
});

export default API;