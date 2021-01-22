import store from '../../store';
/**
 *
 * @param {*} p instance of p5.js
 * @param {*} relPosX relative x coordinate of tile
 * @param {*} relPosY relative y coordinate of tile
 * @param {*} offsetX x offset that tile should be rendered in as a percentage
 * @param {*} offsetY y offset that tile should be rendered in as a percentage
 * @param {*} tileType type of tile from the map
 */
const RenderMapTile = (
  p,
  relPosX,
  relPosY,
  // posX,
  // posY
  offsetX,
  offsetY,
  tileType
) => {
  let { visionWidth, playerWidth, res } = store.getState();
  const screenWidth = res.width;
  const screenHeight = res.height;
  const tileWidth = visionWidth / 10;
  const baseX = (screenWidth - playerWidth) / 2;
  const baseY = (screenHeight - playerWidth) / 2;
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
  p.rect(
    baseX - relPosX * tileWidth - offsetX * tileWidth,
    baseY - relPosY * tileWidth - offsetY * tileWidth,
    tileWidth
  );
  p.pop();
};

export default RenderMapTile;
