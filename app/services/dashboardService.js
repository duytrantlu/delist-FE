import Request from './axiosConfig';

const getDashboard = async time => Request.get(`/auth/signup?filter=${JSON.stringify(time)}`);

export default getDashboard;
