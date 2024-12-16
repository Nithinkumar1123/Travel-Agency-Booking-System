import axios from 'axios';

const api = axios.create({
  baseURL: 'https://travel-agency-booking-system-rps0.onrender.com', // Make sure this matches your backend's URL
});

export default api;
