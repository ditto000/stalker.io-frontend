// import DummyMap from './DummyMap';
import DummyMap from './BigDummyMap';
import RenderMapTile from './RenderMapTile';
import { SetCameraCenter } from './2DCamera';
import store from '../../store';

const drawBackground = (p) => {
  let { playerPos } = store.getState();
  let { playerX, playerY } = playerPos;
  const playerMapCol = Math.floor(playerX / 100);
  const playerMapRow = Math.floor(playerY / 100);
  p.background('black');
  let curMap = DummyMap;
  curMap.forEach((row, mapX) => {
    row.forEach((mapElement, mapY) => {
      if (
        mapX <= xTile + 12 &&
        mapX >= xTile - 12 &&
        mapY <= yTile + 12 &&
        mapY >= yTile - 12
      ) {
        RenderMapTile(p, mapTileCol, mapTileRow, mapElement);
      }
    });
  });
};

export default drawBackground;
