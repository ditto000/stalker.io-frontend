import store from '../../store';
import drawCharacter from './DrawCharacter';

let drawEntities = (p) => {
  let { res, playerWidth, playerList, playerID } = store.getState();
  const centerX = (res.width - playerWidth) / 2;
  const centerY = (res.height - playerWidth) / 2;
  // Draws player
  p.push();
  p.fill('blue');
  p.rect(centerX, centerY, playerWidth);
  p.pop();
  // display other entities
  playerList.forEach((player) => {
    if (player.id !== playerID) {
      drawCharacter(p, player.pos.x, player.pos.y);
    }
  });
};

export default drawEntities;
