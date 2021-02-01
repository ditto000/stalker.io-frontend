import store from '../../store';
import { WorldToScreen } from './2DCamera';

let drawCharacter = (p, playerx, playery) => {
  let { playerWidth } = store.getState();
  let [x, y] = WorldToScreen(playerx, playery);
  p.push();
  p.fill('cyan');
  p.rect(otherX, otherY, playerWidth);
  p.pop();
};

export default drawCharacter;
