import Request from './axios';

const baseUrl = '//localhost:3001';

const getStore = async () => Request.get(`${baseUrl}/api/stores`);

const updateStore = async data => Request.put(`${baseUrl}/api/stores`, data);

const createStore = async data => Request.post(`${baseUrl}/api/stores`, data);

const removeStore = async data => Request.delete(`${baseUrl}/api/stores/${data}`);

export { getStore, updateStore, createStore, removeStore };
