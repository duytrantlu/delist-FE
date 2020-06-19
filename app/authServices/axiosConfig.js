/* eslint-disable */
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://localhost:3001'
});

export default instanceAxios;
