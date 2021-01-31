import { io } from 'socket.io-client';
import store from '../store';
import { updatePlayerId } from '../actions';

// const socket = io('https://node-stalker-io.herokuapp.com/');
const socket = io('https://node-stalker-io.herokuapp.com/');

socket.on('connect', () => {
  console.log('Connected');
  store.dispatch(updatePlayerId(socket.id));
});

export default socket;
