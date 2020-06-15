import Index from 'containers/Dashboard';
import Profile from 'containers/userProfile';
// import Maps from "views/examples/Maps.js";
import Register from 'containers/Register';
import Login from 'containers/Login/Loadable';
import Order from 'containers/Order';
import userManager from 'containers/userManagement';
import storeManager from 'containers/Store';

const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'fas fa-tachometer-alt',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/order',
    name: 'Orders',
    icon: 'fas fa-layer-group',
    component: Order,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'fas fa-user',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/user-manager',
    name: 'User Manager',
    icon: 'fas fa-users',
    component: userManager,
    layout: '/admin',
  },
  {
    path: '/store-manager',
    name: 'Store Manager',
    icon: 'fas fa-store',
    component: storeManager,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'ni ni-circle-08 text-pink',
    component: Register,
    layout: '/auth',
  },
];
export default routes;
