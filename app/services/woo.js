import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


const getListOrderFromWoo = async (instanceStore, page = 1, pageSize = 10) => {
  const wooCommerce = instanceStore.map(store => {
    if (store.active) {
      return new WooCommerceRestApi({
        url: store.baseUrl,
        consumerKey: store.consumerKey,
        consumerSecret: store.consumerSecret,
        version: "wc/v3"
      });
    }
  });
  const result = await Promise.all(wooCommerce.filter(woo => woo != undefined).map(woo => woo.get(`orders?per_page=${pageSize}&page=${page}`)));
  return result;
}


const getCustomerInfo = async (instanceStore, id, storeName) => {
  const wooCommerce = instanceStore.map(store => {
    if (store.name === storeName) {
      return new WooCommerceRestApi({
        url: store.baseUrl,
        consumerKey: store.consumerKey,
        consumerSecret: store.consumerSecret,
        version: "wc/v3"
      });
    }
  });
  const result = await Promise.all(wooCommerce.filter(woo => woo != undefined).map(woo => woo.get(`customers/${id}`)));
  return result;
}
export {
  getListOrderFromWoo,
  getCustomerInfo
}