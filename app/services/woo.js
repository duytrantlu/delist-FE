import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import service from 'services';

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
    rsServer: [],
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
    await wooCommerce.reduce(async (request, woo) => {
      try {
        const wooRs = await woo.api.post(`orders/${woo.id}/shipment-trackings`, { tracking_number: woo.tracking_number, tracking_provider: woo.tracking_provider });
        const response = await service.orderServices.updateOrder({
          tracking: wooRs.data,
          id: woo.id,
          number: woo.orderNumber,
          tracking_provider: woo.tracking_provider
        });
        result.rsServer.push(response.data);
      } catch (err1) {
        result.error.push({ errors: err1, number: woo.orderNumber, id: woo.id });
      }
      return request;
    }, []);
  } catch (err) {
    result.error.push(err);
  } finally {
    if (result.error.length) {
      throw result.error
    }

  }
};
export { getListOrderFromWoo, updateTrackingNumber };
