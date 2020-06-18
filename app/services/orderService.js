import Request from './axios';


const syncData = async data => Request.put(`/api/oms/sync`, data);

const getOrders = async opts =>
  Request.get(
    `/api/orders?page=${opts.page}&limit=${opts.limit}&filter=${
      opts.filter ? JSON.stringify(opts.filter) : null
    }`,
  );

const getDataExport = async opts =>
  Request.get(
    `/api/export/orders?filter=${
      opts.filter ? JSON.stringify(opts.filter) : null
    }`,
  );

export { syncData, getOrders, getDataExport };
