import Request from './axiosConfig';
import Auth from 'utils/Auth';

const syncData = async data => Request.put(`/api/oms/sync`, data, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const getOrders = async opts =>
  Request.get(
    `/api/orders?page=${opts.page}&limit=${opts.limit}&filter=${
    opts.filter ? JSON.stringify(opts.filter) : null
    }`, {
    headers: { 'authorization': `bearer ${Auth.getToken()}` }
  }
  );

const getDataExport = async opts =>
  Request.get(
    `/api/export/orders?filter=${
    opts.filter ? JSON.stringify(opts.filter) : null
    }`, {
    headers: { 'authorization': `bearer ${Auth.getToken()}` }
  }
  );

const updateOrder = async data => Request.put('/api/orders', { orders: data }, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
});

const removeTracking = async data => Request.put('/api/remove/tracking', { order: data }, {
  headers: { 'authorization': `bearer ${Auth.getToken()}` }
})

export { syncData, getOrders, getDataExport, updateOrder, removeTracking };
