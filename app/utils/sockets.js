import io from 'socket.io-client';

const baseUrl = 'http://18.219.90.217/:3001';

// socket
const socket = io(baseUrl);

socket.on('webhookWooCommerce', data => {
  console.log("===woo === data=====", data);
})

export default socket;