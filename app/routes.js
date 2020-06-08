import Index from 'containers/Dashboard';
import Profile from 'containers/userProfile';
// import Maps from "views/examples/Maps.js";
import Register from 'containers/Register';
import Login from 'containers/Login/Loadable';
import Order from 'containers/Order';
// import Tables from "views/examples/Tables.js";
// import Icons from "views/examples/Icons.js";

const routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Index,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'ni ni-single-02 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/order',
    name: 'Orders',
    icon: 'ni ni-bullet-list-67 text-red',
    component: Order,
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
