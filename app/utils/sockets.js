import io from 'socket.io-client';

const baseUrl = process.env.SERVER_URL || '//localhost:3001';

// socket
const socket = io(baseUrl);

socket.on('webhookWooCommerce', data => {
  console.log("===woo === data=====", data);
})

export default socket;