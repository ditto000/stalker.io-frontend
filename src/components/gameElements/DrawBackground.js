// import DummyMap from './DummyMap';
import DummyMap from './BigDummyMap';
import RenderMapTile from './RenderMapTile';
import {SetCameraCenter} from './2DCamera';
import store from '../../store';

const drawBackground = (p) => {
  let { playerPos } = store.getState();
  let { playerX, playerY } = playerPos;
  const playerMapRow = Math.floor(playerX / 100);
  const playerMapCol = Math.floor(playerY / 100);
  p.background('black');

  // Set the center of the screen
  SetCameraCenter(playerX, playerY);

  let curMap = DummyMap;
  curMap.forEach((row, mapTileRow) => {
    row.forEach((mapElement, mapTileCol) => {
      if (
        mapTileRow <= playerMapRow + 12 &&
        mapTileRow >= playerMapRow - 12 &&
        mapTileCol <= playerMapCol + 12 &&
        mapTileCol >= playerMapCol - 12
      ) {
        RenderMapTile(
          p,
          mapTileCol,
          mapTileRow,
          mapElement
        );
      }
    });
  });
};

export default drawBackground;
