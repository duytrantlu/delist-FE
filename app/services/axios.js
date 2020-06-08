/* eslint-disable */
import axios from 'axios';
import Auth from 'utils/Auth';
(function() {
  const token = Auth.getToken();
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
