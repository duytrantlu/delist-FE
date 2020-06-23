import Request from './axiosConfig';
import Auth from 'utils/Auth';

const getDashboard = async time => Request.get(`/api/dashboard/index?filter=${JSON.stringify(time)}`, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

export { getDashboard };
