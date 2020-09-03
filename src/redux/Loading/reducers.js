import {SET_LOADING} from './constants';

const initialState = {
  loading: false,
  loadingText: '',
};

const loadingReducer = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SET_LOADING:
      return {
        loading: action.payload.res,
        loadingText: action.payload.text,
      };

    default:
      return state;
  }
};

export default loadingReducer;
