/* eslint-disable */
import axios from 'axios';
import Auth from 'utils/Auth';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3001'
});

export default instanceAxios;
