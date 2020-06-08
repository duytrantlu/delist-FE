import axios from 'axios';

const Login = async data => axios.post('//localhost:3001/auth/login', data);

export default Login;
