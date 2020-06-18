import Request from './axios';

const getStore = async () => Request.get(`/api/stores`);

const updateStore = async data => Request.put(`}/api/stores`, data);

const createStore = async data => Request.post(`/api/stores`, data);

const removeStore = async data => Request.delete(`/api/stores/${data}`);

export { getStore, updateStore, createStore, removeStore };
