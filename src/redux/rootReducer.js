import {combineReducers} from 'redux';
import loadingReducer from './Loading/reducers';
import addFaceReducer from './AddFace/reducers';
import checkInReducer from './CheckIn/reducers';
import checkOutReducer from './CheckOut/reducers';
import currentLocationReducer from './GetCurrentLocation/reducers';

const appReducer = combineReducers({
  loadingReducer,
  addFaceReducer,
  checkInReducer,
  checkOutReducer,
  currentLocationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'DELETE_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
