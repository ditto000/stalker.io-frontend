// import p5 from 'p5';
import DummyMap from './DummyMap';
import RenderMapTile from './RenderMapTile';

const drawBackground = (p, playerWidth, visionWidth, playerX, playerY) => {
  const xTile = Math.floor(playerX / 100);
  const yTile = Math.floor(playerY / 100);
  // console.log(playerX + ',' + playerY);
  // console.log(
  //   Math.round(playerX) + ',' + Math.round(playerY) + ':' + xTile + ',' + yTile
  // );
  p.background('black');
  let curMap = DummyMap;
  curMap.forEach((row, mapX) => {
    // console.log(mapX);
    row.forEach((mapElement, mapY) => {
      // console.log(xTile, yTile, mapX, mapY);
      if (
        mapX <= xTile + 3 &&
        mapX >= xTile - 3 &&
        mapY <= yTile + 3 &&
        mapY >= yTile - 3
      ) {
        RenderMapTile(
          p,
          visionWidth,
          playerWidth,
          xTile - mapX,
          yTile - mapY,
          (playerX % 100) / 100,
          (playerY % 100) / 100,
          mapElement
        );
      }
    });
  });
};

export default drawBackground;
