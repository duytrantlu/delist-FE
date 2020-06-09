import Signup from './registerService';
import Signin from './loginService';
import {
  profileUserPassword,
  getUsers,
  delUsers,
  editRole,
} from './user-services';

const servicesExpress = {
  register: Signup,
  login: Signin,
  userSevices: {
    profileUserPassword,
    getUsers,
    delUsers,
    editRole,
  },
};

export default servicesExpress;
