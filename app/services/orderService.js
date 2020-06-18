import Request from './axios';

const baseUrl = process.env.SERVER_URL || '//localhost:3001';

const syncData = async data => Request.put(`${baseUrl}/api/oms/sync`, data);

const getOrders = async opts =>
  Request.get(
    `${baseUrl}/api/orders?page=${opts.page}&limit=${opts.limit}&filter=${
      opts.filter ? JSON.stringify(opts.filter) : null
    }`,
  );

const getDataExport = async opts =>
  Request.get(
    `${baseUrl}/api/export/orders?filter=${
      opts.filter ? JSON.stringify(opts.filter) : null
    }`,
  );

export { syncData, getOrders, getDataExport };
