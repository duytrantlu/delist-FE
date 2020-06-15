import Request from './axios';

const baseUrl = '//localhost:3001';

const syncData = async data => Request.put(`${baseUrl}/api/oms/sync`, data);

const getOrders = async opts =>
  Request.get(`${baseUrl}/api/orders?page=${opts.page}&limit=${opts.limit}`);

export { syncData, getOrders };
