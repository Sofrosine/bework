import {CHECK_IN, CHECK_IN_SUCCESS, CHECK_IN_FAILED} from './constants';
import {setLoadingAction} from '../Loading/actions';
import {Alert, ToastAndroid} from 'react-native';
import Axios from 'axios';
import {errorHandler, storeData} from '../../utils';
import {Firebase} from '../../config';

const checkIn = () => ({
  type: CHECK_IN,
});
const checkInSuccess = (res) => ({
  type: CHECK_IN_SUCCESS,
  payload: {res},
});
const checkInFailed = (error) => ({
  type: CHECK_IN_FAILED,
  payload: {error},
});

export const checkInAction = (userFaceId, form, user, navigation) => {
  const user_id = Firebase.auth().currentUser.uid;
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(checkIn);
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
      console.log('apiReq check in', apiReq);
      if (apiReq.data.status === 'failure') {
        dispatch(setLoadingAction(false));
        return Alert.alert('Wajah tidak sesuai, silahkan coba lagi');
      }
      const timestamp = new Date().getTime();
      storeData('@in', timestamp);
      const addInData = await Firebase.database()
        .ref(`/users/${user_id}`)
        .update({in: timestamp});
      const changeHasFace = await Firebase.database()
        .ref(`/users/${user_id}`)
        .update({today_attendance: true});
      const addAttendance = await Firebase.database()
        .ref(`user_attendance/${user_id}/${timestamp}`)
        .set({
          in: timestamp,
          out: false,
        });
      const addAllAttendance = await Firebase.database()
        .ref(`attendance/${timestamp}`)
        .set({
          in: timestamp,
          job_title: user.job_title,
          name: user.name,
          location: user.location,
          nik: user.nik,
          user_id: user_id,
          out: false,
        });
      const userData = await Firebase.database()
        .ref(`/users/${user_id}`)
        .once('value');
      const storeNewData = await storeData('user', userData.val());
      dispatch(checkInSuccess(apiReq.data));
      dispatch(setLoadingAction(false));
      ToastAndroid.show('Berhasil Check-In', 2000);
      navigation.replace('Home');
    } catch (error) {
      console.log('error check in');
      dispatch(checkInFailed(error));
      dispatch(setLoadingAction(false));
      errorHandler(error);
    }
  };
};

// const handleInAttendance = () => {
//   setMapInVisible(false);
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

//     if (!user.hasFace) {
//       // NO FACE
//       // ADD USER DATA
//       let addUserData = {
//         collection_id: '580a5195-2f58-4a0f-a079-9f230f734f85',
//         person_tag: user_id,
//       };
//       let addUserHeaders = {
//         'z-api-key':
//           'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//       };
//       Axios.post('https://zuface.com/api/v1/faces/add_person', addUserData, {
//         headers: addUserHeaders,
//       })
//         .then((res) => console.log('uwuwuwu', res))
//         .catch((e) => {
//           console.log('error', e);
//           Alert.alert(
//             'Data gagal terkirim saat mandaftarkan diri ke Third Party',
//           );
//         });
//       // ADD FACE
//       Axios.post('https://zuface.com/api/v1/faces/add_face', formData, {
//         headers: {
//           'z-api-key':
//             'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(async (result) => {
//           console.log('add Face', result);
//           const timestamp = new Date().getTime();
//           // storeData('@in', timestamp);
//           const addInData = await Firebase.database()
//             .ref(`/users/${user_id}`)
//             .update({in: timestamp});
//           const changeHasFace = await Firebase.database()
//             .ref(`/users/${user_id}`)
//             .update({hasFace: true, today_attendance: true});
//           const addAttendance = await Firebase.database()
//             .ref(`user_attendance/${user_id}/${timestamp}`)
//             .set({
//               in: timestamp,
//               out: false,
//             });
//           const addAllAttendance = await Firebase.database()
//             .ref(`attendance/${timestamp}`)
//             .set({
//               in: timestamp,
//               job_title: user.job_title,
//               name: user.name,
//               location: user.location,
//               nik: user.nik,
//               user_id: user_id,
//               out: false,
//             });
//           const userData = await Firebase.database()
//             .ref(`/users/${user_id}`)
//             .once('value');
//           const storeNewData = await storeData('user', userData.val());
//           const gettingNewData = await gettingData();
//           const updateState = await setUpdate(!update);
//         })
//         .catch((error) => {
//           console.log('error', error);
//           Alert.alert('Data gagal terkirim saat menambahkan wajah');
//         });
//     } else {
//       // HAS FACE
//       Axios.post('https://zuface.com/api/v1/faces/verify', formData, {
//         headers: {
//           'z-api-key':
//             'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//         .then(async (result) => {
//           if (result.data.is_verified) {
//             const timestamp = new Date().getTime();
//             // storeData('@in', timestamp);
//             const addInData = await Firebase.database()
//               .ref(`/users/${user_id}`)
//               .update({in: timestamp});
//             const changeHasFace = await Firebase.database()
//               .ref(`/users/${user_id}`)
//               .update({today_attendance: true});
//             const addAttendance = await Firebase.database()
//               .ref(`user_attendance/${user_id}/${timestamp}`)
//               .set({
//                 in: timestamp,
//                 out: false,
//               });
//             const addAllAttendance = await Firebase.database()
//               .ref(`attendance/${timestamp}`)
//               .set({
//                 in: timestamp,
//                 job_title: user.job_title,
//                 name: user.name,
//                 location: user.location,
//                 nik: user.nik,
//                 user_id: user_id,
//                 out: false,
//               });
//             const userData = await Firebase.database()
//               .ref(`/users/${user_id}`)
//               .once('value');
//             const storeNewData = await storeData('user', userData.val());
//             const gettingNewData = await gettingData();
//             const updateState = await setUpdate(!update);
//             ToastAndroid.show('Data sukses terverifikasi!', ToastAndroid.LONG);
//           } else {
//             ToastAndroid.show(
//               'Data gagal terverifikasi, silahkan coba lagi',
//               ToastAndroid.LONG,
//             );
//           }
//           console.log('verify', result);
//         })
//         .catch((error) => {
//           console.log('error', error);
//           Alert.alert('Data gagal terkirim saat melakukan verifikasi');
//         });
//     }
//   });
// };
