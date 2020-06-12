import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


const getListOrderFromWoo = async instanceStore => {
  const wooCommerce = instanceStore.map(store => {
    return new WooCommerceRestApi({
      url: store.baseUrl,
      consumerKey: store.consumerKey,
      consumerSecret: store.consumerSecret,
      version: "wc/v3"
    }); 
  });
  const result = await Promise.all(wooCommerce.map(woo =>  woo.get(`orders?per_page=100`)));
  return result;
}

export { 
  getListOrderFromWoo
}