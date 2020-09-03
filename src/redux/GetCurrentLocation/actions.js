import {GET_CURRENT_LOCATION} from './constants';
import Geolocation from '@react-native-community/geolocation';

const getCurrentLocation = (latitude, longitude) => ({
  type: GET_CURRENT_LOCATION,
  payload: {
    latitude,
    longitude,
  },
});

export const getCurrentLocationAction = () => {
  return async (dispatch) => {
    Geolocation.getCurrentPosition(
      (info) => {
        console.log('infooo', info);
        dispatch(
          getCurrentLocation(info.coords.latitude, info.coords.longitude),
        );
      },
      (error) => console.log('error get location', error),
      {
        enableHighAccuracy: true,
      },
    );
  };
};
