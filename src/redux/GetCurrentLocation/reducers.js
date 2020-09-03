import {GET_CURRENT_LOCATION} from './constants';

const initialState = {
  latitude: 0,
  longitude: 0,
};

const currentLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };

    default:
      return state;
  }
};

export default currentLocationReducer;
