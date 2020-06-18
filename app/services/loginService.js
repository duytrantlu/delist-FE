import axios from 'axios';

const baseUrl = process.env.SERVER_URL || '//localhost:3001';

const Login = async data => axios.post(`${baseUrl}/auth/login`, data);

export default Login;
