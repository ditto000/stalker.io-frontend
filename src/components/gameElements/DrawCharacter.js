import store from '../../store';
import {ScreenPosition } from './2DCamera';

let drawCharacter = (p, playerx, playery) => {
  let { res, playerWidth, playerPos, tileWidth } = store.getState();
  const baseX = (res.width - playerWidth) / 2;
  const baseY = (res.height - playerWidth) / 2;
  let [x, y] = ScreenPosition(playerx, playery);
  p.push();
  p.fill('cyan');
  p.rect(x, y, playerWidth);
  p.pop();
};

export default drawCharacter;
