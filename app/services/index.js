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
  removeStore,
} from './store-services';
import { getListOrderFromWoo, getCustomerInfo } from './woo';

import {
  syncData,
  getOrders,
  getDataExport,
  updateOrder
} from './orderService';

const servicesExpress = {
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
    removeStore,
  },
  wooServices: {
    getListOrderFromWoo,
    getCustomerInfo,
  },
  orderServices: {
    syncData,
    getOrders,
    getDataExport,
    updateOrder
  },
};

export default servicesExpress;
