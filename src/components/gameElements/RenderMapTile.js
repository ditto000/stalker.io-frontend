/**
 *
 * @param {*} p instance of p5.js
 * @param {*} visionWidth width of the vision square
 * @param {*} playerWidth width of the player
 * @param {*} relPosX relative x coordinate of tile
 * @param {*} relPosY relative y coordinate of tile
 * @param {*} offsetX x offset that tile should be rendered in as a percentage
 * @param {*} offsetY y offset that tile should be rendered in as a percentage
 * @param {*} tileType type of tile from the map
 */
const RenderMapTile = (
  p,
  visionWidth,
  playerWidth,
  relPosX,
  relPosY,
  // posX,
  // posY
  offsetX,
  offsetY,
  tileType
) => {
  const screenWidth = p.width;
  const screenHeight = p.height;
  const tileWidth = visionWidth / 5;
  const baseX = (screenWidth - playerWidth) / 2;
  const baseY = (screenHeight - playerWidth) / 2;
  // const tileX = posX * (visionWidth / 5);
  // const tileY = posY * (visionWidth / 5);
  p.push();
  switch (tileType) {
    case 0:
      p.fill('red');
      break;
    case 1:
      p.fill('yellow');
      break;
    default:
      p.fill('white');
  }
  // p.rect(tileX - offsetX, tileY - offsetY, visionWidth / 5);
  p.noStroke();
  p.rect(
    baseX - relPosX * tileWidth - offsetX * tileWidth,
    baseY - relPosY * tileWidth - offsetY * tileWidth,
    tileWidth
  );
  p.pop();
};

export default RenderMapTile;
