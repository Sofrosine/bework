import {CHECK_IN, CHECK_IN_FAILED, CHECK_IN_SUCCESS} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const checkInReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IN:
      return {
        ...state,
        loading: true,
      };
    case CHECK_IN_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case CHECK_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default checkInReducer;
