import Request from './axiosConfig';

const Signup = async data => Request.post(`/auth/signup`, data);

export default Signup;
