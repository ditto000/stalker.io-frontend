import updateMovement from './Movement';

import socket from '../socket';

export class GameUpdate{
  constructor(){
    setInterval(this.update.bind(this), 1000/60);
  }
  
  update() {

    let newPos = updateMovement();

    socket.emit('movement', newPos);
  }
}

export default GameUpdate;
