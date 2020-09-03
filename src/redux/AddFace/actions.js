import {ADD_FACE, ADD_FACE_SUCCESS, ADD_FACE_FAILED} from './constants';
import {errorHandler} from '../../utils';
import Axios from 'axios';
import {Firebase} from '../../config';
import {setLoadingAction} from '../Loading/actions';
import {ToastAndroid} from 'react-native';

const addFace = () => ({
  type: ADD_FACE,
});

const addFaceSuccess = (res) => ({
  type: ADD_FACE_SUCCESS,
  payload: {res},
});

const addFaceFailed = (error) => ({
  type: ADD_FACE_FAILED,
  payload: {error},
});

export const addFaceAction = (name, form, navigation) => {
  const user_id = Firebase.auth().currentUser.uid;
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    dispatch(addFace());
    try {
      // CREATE PERSON
      const apiReq = await Axios.post(
        'https://api.luxand.cloud/subject',
        {
          name,
        },
        {
          headers: {
            token: '52afccb25dd24e4695fe8c2a75ce66f4',
          },
        },
      );
      console.log('apiReq create person', apiReq);
      //   ADD FACE
      const id = await apiReq.data.id;
      //   UPDATE USER FACE ID DATABASE
      await Firebase.database()
        .ref(`/users/${user_id}`)
        .update({userFaceId: id, hasFace: true});
      const apiReqFace = await Axios.post(
        `https://api.luxand.cloud/subject/${id}`,
        form,
        {
          headers: {
            token: '52afccb25dd24e4695fe8c2a75ce66f4',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('apiReq add Face', apiReq);
      dispatch(setLoadingAction(false));
      dispatch(addFaceSuccess(apiReqFace.data));
      ToastAndroid.show('Berhasil mendaftarkan wajah', 3000);
      navigation.replace('Home');
    } catch (error) {
      console.log('error');
      dispatch(addFaceFailed(error));
      dispatch(setLoadingAction(false));
      errorHandler(error);
    }
  };
};

// const handleRegisterFace = async () => {
//   ImagePicker.launchCamera({quality: 0.2}, (res) => {
//     console.log('ressss', res);
//     if (res.didCancel) {
//       return Alert.alert('Batal mengambil wajah');
//     }
//     const formData = new FormData();
//     formData.append('collection_id', '580a5195-2f58-4a0f-a079-9f230f734f85');
//     formData.append('person_tag', user_id);
//     formData.append('image_source', 1);
//     formData.append('image_file', {
//       uri: res.uri,
//       name: `${user_id}.jpg`,
//       type: 'image/jpeg',
//     });
//     // NO FACE
//     // ADD USER DATA
//     let addUserData = {
//       collection_id: '580a5195-2f58-4a0f-a079-9f230f734f85',
//       person_tag: user_id,
//     };
//     let addUserHeaders = {
//       'z-api-key':
//         'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//     };
//     Axios.post('https://zuface.com/api/v1/faces/add_person', addUserData, {
//       headers: addUserHeaders,
//     })
//       .then((res_person) => {
//         console.log('uwuwuwu', res_person);
//         Axios.post('https://zuface.com/api/v1/faces/add_face', formData, {
//           headers: {
//             'z-api-key':
//               'YzRmMmIxYjFkMDVlNDlhMmEyNGZjMjZhZDFjYzQ0NGQwM2RkNzE2MjUzMjQ0ZjY4YWExNWQyODE3MGM5NzExMg==',
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//           .then(async (result) => {
//             console.log('add Face', result);
//             const timestamp = new Date().getTime();
//             const changeHasFace = await Firebase.database()
//               .ref(`/users/${user_id}`)
//               .update({hasFace: true});
//             const userData = await Firebase.database()
//               .ref(`/users/${user_id}`)
//               .once('value');
//             const storeNewData = await storeData('user', userData.val());
//             const gettingNewData = await gettingData();
//             const updateState = await setUpdate(!update);
//             ToastAndroid.show('Wajah berhasil didaftarkan!', ToastAndroid.LONG);
//           })
//           .catch((error) => {
//             console.log('error', error);
//             Alert.alert('Data gagal terkirim saat menambahkan wajah');
//           });
//       })
//       .catch((e) => {
//         console.log('error', e);
//         Alert.alert(
//           'Data gagal terkirim saat mandaftarkan diri ke Third Party',
//         );
//       });
//   });
// };
