import {CHECK_OUT, CHECK_OUT_FAILED, CHECK_OUT_SUCCESS} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const checkOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_OUT:
      return {
        ...state,
        loading: true,
      };
    case CHECK_OUT_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case CHECK_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default checkOutReducer;
