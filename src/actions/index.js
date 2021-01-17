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

// export const resolution = (payload) => {
//   return {
//     type: 'RESOLUTION_UPDATE',
//     payload,
//   };
// };
