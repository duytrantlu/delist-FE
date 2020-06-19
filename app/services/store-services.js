import Request from './axiosConfig';
import Auth from 'utils/Auth';

const getStore = async () => Request.get(`/api/stores`, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const updateStore = async data => Request.put(`/api/stores`, data, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const createStore = async data => Request.post(`/api/stores`, data, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const removeStore = async data => Request.delete(`/api/stores/${data}`, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

export { getStore, updateStore, createStore, removeStore };
