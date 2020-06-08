import Signup from './registerService';
import Signin from './loginService';
import { profileUserPassword, getUsers, delUsers } from './user-services';

const servicesExpress = {
  register: Signup,
  login: Signin,
  userSevices: {
    profileUserPassword,
    getUsers,
    delUsers,
  },
};

export default servicesExpress;
