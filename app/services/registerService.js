import axios from 'axios';

const Signup = async data =>
  axios.post(`/auth/signup`, data);

export default Signup;
