import {Alert} from 'react-native';

export const errorHandler = (error) => {
  if (error.response) {
    if (error.response.status === 500) {
      Object.entries(error.response.data.data).map((data_array, key) => {
        data_array[1].map((error_data, k) => {
          Alert.alert(error_data);
          console.log('eror bro', error_data);
        });
      });
    }
  } else {
    return Alert.alert(error.message);
  }
};
