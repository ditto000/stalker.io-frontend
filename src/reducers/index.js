import { combineReducers } from 'redux';

const testReducer = (state = null, action) => {
  switch (action.type) {
    case 'A':
      return action.payload;
    case 'B':
      return action.payload;
    default:
      return state;
  }
};

const updateResolution = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_RESOLUTION':
      return {
        width: action.payload.width,
        height: action.payload.height,
      };
    default:
      return state;
  }
};

const updateVisionWidth = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_RESOLUTION':
      return action.payload.height;
    default:
      return state;
  }
};

const updatePlayerWidth = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_RESOLUTION':
      return action.payload.height / 30;
    default:
      return state;
  }
};

const updateTileWidth = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_RESOLUTION':
      return action.payload.height / 10;
    default:
      return state;
  }
};

const updateKeyPositions = (
  state = { w: false, a: false, s: false, d: false },
  action
) => {
  switch (action.type) {
    case 'UPDATE_KEY_POS':
      if (['w', 'a', 's', 'd'].includes(action.payload.key)) {
        let newState = { ...state };
        newState[action.payload.key] = action.payload.pressed;
        return newState;
      }
      return state;
    default:
      return state;
  }
};

const updatePlayerState = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_PLAYER_LIST':
      return action.payload;
    default:
      return state;
  }
};

const getPlayerID = (state = '', action) => {
  switch (action.type) {
    case 'PLAYER_CONNECTION':
      return action.payload;
    default:
      return state;
  }
};

const updatePlayerPos = (state = { playerX: 0, playerY: 0 }, action) => {
  switch (action.type) {
    case 'PLAYER_POSITION':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  testElement: testReducer,
  res: updateResolution,
  visionWidth: updateVisionWidth,
  playerWidth: updatePlayerWidth,
  tileWidth: updateTileWidth,
  keysDown: updateKeyPositions,
  playerList: updatePlayerState,
  playerID: getPlayerID,
  playerPos: updatePlayerPos,
});
