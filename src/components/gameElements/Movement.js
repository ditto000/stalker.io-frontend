import store from '../../store';

let updateMovement = () => {
  let dirX = 0;
  let dirY = 0;
  let { keysDown, playerPos } = store.getState();
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

  let newPos = { x: playerPos.playerX+dirX*10, y: playerPos.playerY+dirY*10 };

  return newPos;
};

export default updateMovement;
