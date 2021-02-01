import store from '../../store';
import socket from '../socket';

let updateMovement = () => {
  let dirX = 0;
  let dirY = 0;
  let { keysDown } = store.getState();
  for (let element in keysDown) {
    switch (element) {
      case 'w':
        if (keysDown.w) dirY--;
        break;
      case 'a':
        if (keysDown.a) dirX--;
        break;
      case 's':
        if (keysDown.s) dirY++;
        break;
      case 'd':
        if (keysDown.d) dirX++;
        break;
      default:
        break;
    }
  }

  socket.emit('movement', { dirX: dirX, dirY: dirY });
};

export default updateMovement;
