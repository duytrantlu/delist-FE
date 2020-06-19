import Request from './axiosConfig';
import Auth from 'utils/Auth';

const profileUserPassword = async data =>
  Request.put(`/api/users/profile/password`, data, {
    headers: { 'authorization': `bearer ${Auth.getToken()}` }
  });

const getUsers = async () => Request.get(`/api/users`, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const delUsers = async ids => Request.delete(`/api/users/ids/${ids}`, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const editRole = async user => Request.put(`/api/users/role`, user, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

export { profileUserPassword, getUsers, delUsers, editRole };
