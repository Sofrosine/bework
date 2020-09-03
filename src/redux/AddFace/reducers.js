import {ADD_FACE, ADD_FACE_FAILED, ADD_FACE_SUCCESS} from './constants';

const initialState = {
  loading: false,
  data: [],
  error: false,
};

const addFaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FACE:
      return {
        ...state,
        loading: true,
      };
    case ADD_FACE_FAILED:
      return {
        ...state,
        loading: false,
        data: action.payload.res,
      };
    case ADD_FACE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default addFaceReducer;
