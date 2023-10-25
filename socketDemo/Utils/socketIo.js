import {Platform} from 'react-native';
import SocketIOClient from 'socket.io-client';
const SOCKET_URL = 'wss://socketsbay.com/wss/v2/2/demo/';
// 'wss://demo.piesocket.com/v3/channel_123?api_key=6Lpd8h1JpVkCz0t7LBlUpsQSve7khRMUZBAZPILn&notify_self';
// 'http://35.154.76.187:3500/';

class WebService {
  initializeSocket = async () => {
    try {
      let callerId = Platform.OS === 'android' ? '123' : '456';
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
