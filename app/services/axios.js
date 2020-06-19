/* eslint-disable */
import axios from 'axios';
import Auth from 'utils/Auth';
(function() {
  const token = Auth.getToken();
  
  axios.defaults.baseURL = 'http://18.219.90.217:3001';
  if (token) {
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  } else {
    axios.defaults.headers.common.Authorization = null;
    /* if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
})();
export default axios;
