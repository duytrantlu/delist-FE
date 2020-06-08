import Signup from './registerService';
import Signin from './loginService';
import { profileUserPassword } from './user-services';

const servicesExpress = {
  register: Signup,
  login: Signin,
  profileUser: profileUserPassword,
};

export default servicesExpress;
