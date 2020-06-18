import Request from './axios';

const profileUserPassword = async data =>
  Request.put(`/api/users/profile/password`, data);

const getUsers = async () => Request.get(`/api/users`);

const delUsers = async ids => Request.delete(`/api/users/ids/${ids}`);

const editRole = async user => Request.put(`/api/users/role`, user);

export { profileUserPassword, getUsers, delUsers, editRole };
