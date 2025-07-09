import axios from 'axios';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5000'; 

// Add request interceptor for auth token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;