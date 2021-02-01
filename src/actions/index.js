export const A = (payload) => {
  return {
    type: 'A',
    payload: 'TestA ' + payload,
  };
};

export const B = (payload) => {
  return {
    type: 'B',
    payload: 'TestB ' + payload,
  };
};

export const updateResolution = (payload) => {
  return {
    type: 'UPDATE_RESOLUTION',
    payload,
  };
};

export const updateKeyPositions = (payload) => {
  return {
    type: 'UPDATE_KEY_POS',
    payload,
  };
};

export const updatePlayerList = (payload) => {
  return {
    type: 'UPDATE_PLAYER_LIST',
    payload,
  };
};

export const updatePlayerId = (payload) => {
  return {
    type: 'PLAYER_CONNECTION',
    payload,
  };
};

export const updatePlayerLocation = (payload) => {
  return {
    type: 'PLAYER_POSITION',
    payload,
  };
};
