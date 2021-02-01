import store from '../../store';

let drawCharacter = (p, x, y) => {
  let { res, playerWidth, playerPos, tileWidth } = store.getState();
  const baseX = (res.width - playerWidth) / 2;
  const baseY = (res.height - playerWidth) / 2;
  let otherX = baseX + ((x - playerPos.playerX) / 100) * tileWidth;
  let otherY = baseY + ((y - playerPos.playerY) / 100) * tileWidth;
  p.push();
  p.fill('cyan');
  p.rect(otherX, otherY, playerWidth);
  p.pop();
};

export default drawCharacter;
