import store from '../../store';

let cameraX = 0;
let cameraY = 0;

const SetCameraCenter = (worldX, worldY) => {
  cameraX = worldX;
  cameraY = worldY;
};

let res = () => store.getState().res;

let scalingRatio = () => store.getState().scalingRatio;

// Take screen postion and return world position.
const ScreenToWorld = (screenX, screenY) => [
  screenX / scalingRatio() + (cameraX - res().width / 2 / scalingRatio()),
  screenY / scalingRatio() + (cameraY - res().height / 2 / scalingRatio()),
];

// Take world position and return screen position.
const WorldToScreen = (worldX, worldY) => [
  worldX * scalingRatio() + (res().width / 2 - cameraX * scalingRatio()),
  worldY * scalingRatio() + (res().height / 2 - cameraY * scalingRatio()),
];

export { SetCameraCenter, ScreenToWorld, WorldToScreen };
