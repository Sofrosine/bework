import {GET_CURRENT_LOCATION} from './constants';
import Geolocation from '@react-native-community/geolocation';
import {setLoadingAction} from '../Loading/actions';

const getCurrentLocation = (latitude, longitude) => ({
  type: GET_CURRENT_LOCATION,
  payload: {
    latitude,
    longitude,
  },
});

export const getCurrentLocationAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('infooo', info);
        dispatch(
          getCurrentLocation(info.coords.latitude, info.coords.longitude),
        );
        dispatch(setLoadingAction(false));
      },
      (error) => {
        console.log('error get location', error);
        dispatch(setLoadingAction(false));
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 2000,
      },
    );
  };
};
