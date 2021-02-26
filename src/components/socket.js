import { io } from 'socket.io-client';
import store from '../store';
import { updatePlayerId } from '../actions';

// const socket = io('http://localhost:9000');
const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log('Connected');
  store.dispatch(updatePlayerId(socket.id));
});

export default socket;
