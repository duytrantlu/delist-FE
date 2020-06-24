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
  try {
    const wooCommerce = [];
    orders.forEach(order => {
      instanceStore.forEach(s => {
        if (order.store === s.name) {
          wooCommerce.push({
            id: order.orderid,
            tracking_number: order.tracking_number,
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
    const result = await Promise.all(
      wooCommerce
        .map(woo => woo.api.post(`orders/${woo.id}/shipment-trackings`, { tracking_number: woo.tracking_number })),
    );
    return result;
  } catch (err) {
    return err;
  }
};
export { getListOrderFromWoo, updateTrackingNumber };
