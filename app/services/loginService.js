import axios from 'axios';


const Login = async data => axios.post(`/auth/login`, data);

export default Login;
