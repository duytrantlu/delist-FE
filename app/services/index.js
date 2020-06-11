import Signup from './registerService';
import Signin from './loginService';
import {
  profileUserPassword,
  getUsers,
  delUsers,
  editRole,
} from './user-services';
import { getStore, updateStore, createStore } from './store-services';
const servicesExpress = {
  register: Signup,
  login: Signin,
  userSevices: {
    profileUserPassword,
    getUsers,
    delUsers,
    editRole,
  },
  storeServices: {
    getStore,
    updateStore,
    createStore,
  },
};

export default servicesExpress;
