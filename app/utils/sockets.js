import io from 'socket.io-client';

const baseUrl = 'http://api.delistmanagement.com:3001';

// socket
const socket = io(baseUrl);

export default socket;