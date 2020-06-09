import Request from './axios';

const baseUrl = '//localhost:3001';
const profileUserPassword = async data =>
  Request.put(`${baseUrl}/api/users/profile/password`, data);

const getUsers = async () => Request.get(`${baseUrl}/api/users`);

const delUsers = async ids => Request.delete(`${baseUrl}/api/users/ids/${ids}`);

export { profileUserPassword, getUsers, delUsers };
