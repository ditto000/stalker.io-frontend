import store from '../../store';
import { WorldToScreen } from './2DCamera';

/**
 *
 * @param {*} p instance of p5.js
 * @param {*} tileX map x of tile
 * @param {*} tileY map y of tile
 * @param {*} tileType type of tile from the map
 */
const RenderMapTile = (p, tileCol, tileRow, tileType) => {
  let { tileWidth } = store.getState();
  p.push();
  switch (tileType) {
    case 0:
      p.fill('grey');
      break;
    case 1:
      p.fill('tan');
      break;
    default:
      p.fill('white');
  }
  p.noStroke();
  let [x, y] = WorldToScreen(tileCol * 100, tileRow * 100);
  p.rect(x, y, tileWidth + 1);
  p.pop();
};

export default RenderMapTile;
