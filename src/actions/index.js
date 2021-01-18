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
