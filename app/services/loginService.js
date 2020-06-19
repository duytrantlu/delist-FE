import Request from './axiosConfig';

const Login = async data => Request.post('/auth/login', data);

export default Login;
