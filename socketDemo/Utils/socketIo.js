import SocketIOClient from 'socket.io-client';
const SOCKET_URL = 'http://localhost:3000/';

class WebService {
  initializeSocket = async () => {
    try {
      this.socket = SocketIOClient(SOCKET_URL, {
        transports: ['websocket'],
      });
      console.log('==== Initializing socket ====');

      this.socket.on('connect', data => {
        console.log('=== socket connected === ', data);
      });
      this.socket.on('error', data => {
        console.log('=== socket error === ', data);
      });
    } catch (error) {
      console.log('==== Initializing error ====', error);
    }
  };
  emit = (event, data) => {
    this.socket.emit(event, data);
  };

  on = (event, cb) => {
    this.socket.on(event, cb);
  };
  removeListener = listenerName => {
    /*  */
    this.socket.removeListener(listenerName);
  };
}

export const socketService = new WebService();
