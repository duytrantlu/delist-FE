import Request from './axios';

const baseUrl = '//localhost:3001';
const profileUserPassword = async data =>
  Request.put(`${baseUrl}/api/users/profile/password`, data);

export { profileUserPassword };
