import {CHECK_OUT, CHECK_OUT_SUCCESS, CHECK_OUT_FAILED} from './constants';
import {setLoadingAction} from '../Loading/actions';
import {Alert, ToastAndroid} from 'react-native';
import Axios from 'axios';
import {errorHandler, storeData} from '../../utils';
import {Firebase} from '../../config';

const checkOut = () => ({
  type: CHECK_OUT,
});
const checkOutSuccess = (res) => ({
  type: CHECK_OUT_SUCCESS,
  payload: {res},
});
const checkOutFailed = (error) => ({
  type: CHECK_OUT_FAILED,
  payload: {error},
});

export const checkOutAction = (userFaceId, form, user, navigation) => {
  const user_id = Firebase.auth().currentUser.uid;
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(checkOut);
    try {
      const apiReq = await Axios.post(
        `https://api.luxand.cloud/photo/verify/${userFaceId}`,
        form,
        {
          headers: {
            token: '52afccb25dd24e4695fe8c2a75ce66f4',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('apiReq check out', apiReq);
      if (apiReq.data.status === 'failure') {
        dispatch(setLoadingAction(false));
        return Alert.alert('Wajah tidak sesuai, silahkan coba lagi');
      }
      //   const inTimestamp = await getData('@in');
      const inTimestamp = user.in;
      const nowTimestamp = new Date().getTime();
      const changeTodayAttendance = await Firebase.database()
        .ref(`/users/${user_id}`)
        .update({today_attendance: false});
      const addAttendance = await Firebase.database()
        .ref(`user_attendance/${user_id}/${inTimestamp}`)
        .update({
          out: nowTimestamp,
        });
      const addAllAttendance = await Firebase.database()
        .ref(`attendance/${inTimestamp}`)
        .update({
          out: nowTimestamp,
        });
      const userData = await Firebase.database()
        .ref(`/users/${user_id}`)
        .once('value');
      const storeNewData = await storeData('user', userData.val());
      dispatch(checkOutSuccess(apiReq.data));
      dispatch(setLoadingAction(false));
      ToastAndroid.show('Berhasil Check-Out', 2000);
      navigation.replace('Home');
    } catch (error) {
      console.log('error check in');
      dispatch(checkOutFailed(error));
      dispatch(setLoadingAction(false));
      errorHandler(error);
    }
  };
};

// const handleCheckout = () => {
//   setMapOutVisible(false);
//   setModalAlert(false);
//   ImagePicker.launchCamera({quality: 0.2}, (res) => {
//     const formData = new FormData();
//     formData.append('collection_id', '580a5195-2f58-4a0f-a079-9f230f734f85');
//     formData.append('person_tag', user_id);
//     formData.append('image_source', 1);
//     formData.append('image_file', {
//       uri: res.uri,
//       name: `${user_id}.jpg`,
//       type: 'image/jpeg',
//     });
//     Axios.post('https://zuface.com/api/v1/faces/verify', formData, {
//       headers: {
//         'z-api-key':
//           'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//       .then(async (result) => {
//         if (result.data.is_verified) {
//           // const inTimestamp = await getData('@in');
//           const inTimestamp = user.in;
//           const nowTimestamp = new Date().getTime();
//           const changeTodayAttendance = await Firebase.database()
//             .ref(`/users/${user_id}`)
//             .update({today_attendance: false});
//           const addAttendance = await Firebase.database()
//             .ref(`user_attendance/${user_id}/${inTimestamp}`)
//             .update({
//               out: nowTimestamp,
//             });
//           const addAllAttendance = await Firebase.database()
//             .ref(`attendance/${inTimestamp}`)
//             .update({
//               out: nowTimestamp,
//             });
//           const userData = await Firebase.database()
//             .ref(`/users/${user_id}`)
//             .once('value');
//           const storeNewData = await storeData('user', userData.val());
//           const gettingNewData = await gettingData();
//           const updateState = await setUpdate(!update);
//           ToastAndroid.show('Data sukses terverifikasi!', ToastAndroid.LONG);
//         } else {
//           ToastAndroid.show(
//             'Data gagal terverifikasi, silahkan coba lagi',
//             ToastAndroid.LONG,
//           );
//         }
//         console.log('verify', result);
//       })
//       .catch((error) => {
//         console.log('error', error);
//         Alert.alert('Data gagal terkirim');
//       });
//   });
// };
