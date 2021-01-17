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

// const updateResolution = (state = null, action) => {
//   switch (action.type) {
//     case 'resolution':
//       return action.payload;
//     default:
//       return state;
//   }
// };

export default combineReducers({
  testElement: testReducer,
});
