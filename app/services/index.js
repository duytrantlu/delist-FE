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
import { getListOrderFromWoo, updateTrackingNumber } from './woo';

import {
  syncData,
  getOrders,
  getDataExport,
  updateOrder
} from './orderService';

import {
  getDashboard
} from './dashboardService';

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
    updateTrackingNumber,
  },
  orderServices: {
    syncData,
    getOrders,
    getDataExport,
    updateOrder
  },
  dashboard: {
    getDashboard
  }
};

export default servicesExpress;
