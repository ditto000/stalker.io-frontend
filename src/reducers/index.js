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
      return action.payload.visionWidth;
    default:
      return state;
  }
};

export default combineReducers({
  testElement: testReducer,
  res: updateResolution,
  visionWidth: updateVisionWidth,
});
