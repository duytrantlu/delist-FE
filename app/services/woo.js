import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const getListOrderFromWoo = async (instanceStore, page = 1, pageSize = 10) => {
  const wooCommerce = instanceStore.map(store => {
    if (store.active) {
      return new WooCommerceRestApi({
        url: store.baseUrl,
        consumerKey: store.consumerKey,
        consumerSecret: store.consumerSecret,
        version: 'wc/v3',
      });
    }
  });
  const result = await Promise.all(
    wooCommerce
      .filter(woo => woo != undefined)
      .map(woo => woo.get(`orders?per_page=${pageSize}&page=${page}`)),
  );
  return result;
};


const updateTrackingNumber = async (instanceStore, orders) => {
  let result = {
    error: [],
    rs: [],
  };
  try {
    const wooCommerce = [];
    orders.forEach(order => {
      instanceStore.forEach(s => {
        if (order.store === s.name) {
          wooCommerce.push({
            id: order.orderid,
            tracking_number: order.tracking_number,
            tracking_provider: order.tracking_provider,
            orderNumber: order.order_number,
            api: new WooCommerceRestApi({
              url: s.baseUrl,
              consumerKey: s.consumerKey,
              consumerSecret: s.consumerSecret,
              version: 'wc/v3',
            })
          });
        }
      })
    });

    for (let i = 0; i < wooCommerce.length; i++) {
      try {
        const wooRs = await wooCommerce[i].api.post(`orders/${wooCommerce[i].id}/shipment-trackings`, { tracking_number: wooCommerce[i].tracking_number, tracking_provider: wooCommerce[i].tracking_provider });
        result.rs.push({ tracking: wooRs.data, id: wooCommerce[i].id, number: wooCommerce[i].orderNumber })
      } catch (err1) {
        result.error.push(err1);
      }
    }
  } catch (err) {
    result.error.push(err);
  } finally {
    return result;
  }
};
export { getListOrderFromWoo, updateTrackingNumber };
