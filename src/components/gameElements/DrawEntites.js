import store from '../../store';
import drawCharacter from './DrawCharacter';

let drawEntities = (p) => {
  let { res, playerWidth, playerList, playerID } = store.getState();
  const baseX = (res.width - playerWidth) / 2;
  const baseY = (res.height - playerWidth) / 2;
  // Draws player
  p.push();
  p.fill('blue');
  p.rect(baseX, baseY, playerWidth);
  p.pop();
  // let curTileX = Math.floor(playerPos.playerX / 100);
  // let curTileY = Math.floor(playerPos.playerY / 100);
  // let curTileOffsetX = playerPos.playerX % 100;
  // let curTileOffsetY = playerPos.playerY % 100;
  // display other entities
  playerList.forEach((player) => {
    if (player.id !== playerID) {
      drawCharacter(p, player.pos.x, player.pos.y);
    }
  });
};

export default drawEntities;
