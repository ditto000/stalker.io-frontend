import store from '../../store';

let cameraX = 0;
let cameraY = 0;

const SetCameraCenter = (worldX, worldY) => {
    cameraX = worldX;
    cameraY = worldY;
    console.log(cameraX +" cam " + cameraY)
}

let res = () => store.getState().res;

// Take screen postion and return world position.
const WorldPosition = (screenX, screenY) => [screenX + (cameraX - res().width / 2), screenY + (cameraY - res().height / 2)];

// Take world position and return screen position.
const ScreenPosition = (worldX, worldY) => [worldX + (res().width / 2 - cameraX), worldY + (res().height / 2 - cameraY)];

export {SetCameraCenter, WorldPosition, ScreenPosition}