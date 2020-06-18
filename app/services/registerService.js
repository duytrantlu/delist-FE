import axios from 'axios';
const baseUrl = process.env.SERVER_URL || '//localhost:3001';

const Signup = async data =>
  axios.post(`${baseUrl}/auth/signup`, data);

export default Signup;
