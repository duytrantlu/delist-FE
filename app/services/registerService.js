import axios from 'axios';

const Signup = async data =>
  axios.post('http://localhost:3001/auth/signup', data);

export default Signup;
