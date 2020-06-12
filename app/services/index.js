import Signup from './registerService';
import Signin from './loginService';
import {
  profileUserPassword,
  getUsers,
  delUsers,
  editRole,
} from './user-services';
import {
  getStore,
  updateStore,
  createStore,
  removeStore
} from './store-services';
import {
  getListOrderFromWoo
} from './woo';
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
    removeStore
  },
  wooServices:{
    getListOrderFromWoo
  }
};

export default servicesExpress;
