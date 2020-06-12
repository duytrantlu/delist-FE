import io from 'socket.io-client';

// socket
const socket = io('http://localhost:3001');

socket.on('webhookWooCommerce', data => {
  console.log("===woo === data=====", data);
})

export default socket;