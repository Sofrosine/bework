import {SET_LOADING} from './constants';

const setLoading = (res, loadingText) => ({
  type: SET_LOADING,
  payload: {res, loadingText},
});

export const setLoadingAction = (status, text) => {
  return async (dispatch) => {
    dispatch(setLoading(status, text));
  };
};
