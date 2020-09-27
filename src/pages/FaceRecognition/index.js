import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Easing,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch} from 'react-redux';
import {Firebase} from '../../config';
import {
  addFaceAction,
  checkInAction,
  checkOutAction,
} from '../../redux/actions';
import {colors, fonts} from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';

function FaceRecognition({navigation, route}) {
  const {status} = route.params;
  const [state, setState] = useState({
    rightMouth: {},
    leftMouth: {},
    rightEar: {},
    leftEar: {},
    rightCheek: {},
    leftCheek: {},
    leftEye: {},
    rightEye: {},
    bottomMouth: {},
    noseBase: {},
  });
  const [user, setUser] = useState({
    name: '',
    location: '',
    today_attendance: '',
    hasFace: '',
    job_title: '',
    nik: '',
    userFaceId: '',
    in: '',
  });
  const user_id = Firebase.auth().currentUser.uid;
  const dispatch = useDispatch();
  const [buttonPosition, setButtonPosition] = useState(
    new Animated.Value(-200),
  );
  const [detectStatus, setDetecStatus] = useState('noface');

  const takePicture = async function (camera) {
    const options = {
      quality: 1,
      base64: true,
      mirrorImage: true,
      fixOrientation: true,
    };
    const data = await camera.takePictureAsync(options);
    console.log('take picture data', data);
    const formData = new FormData();
    formData.append('store', 1);
    formData.append('photo', {
      uri: data.uri,
      name: `${user_id}.jpg`,
      type: 'image/jpeg',
    });
    if (status === 'register') {
      dispatch(addFaceAction(user.nik, formData, navigation));
    } else if (status === 'check-in') {
      dispatch(checkInAction(user.userFaceId, formData, user, navigation));
    } else {
      dispatch(checkOutAction(user.userFaceId, formData, user, navigation));
    }
  };

  const gettingData = async () => {
    const data = await Firebase.database()
      .ref(`/users/${user_id}`)
      .once('value');
    console.log('userDAta', data.val());
    await setUser(data.val());
  };

  const handlePosition = async (res) => {
    if (res.faces[0].rightMouthPosition) {
      await setState({
        rightMouth: res.faces[0].rightMouthPosition,
        rightEye: res.faces[0].rightEyePosition,
      });
      if (detectStatus === 'noface') {
        if (Math.round(state.rightMouth.x) === 171) {
          setDetecStatus('face');
          Animated.timing(buttonPosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
          }).start();
        }
        if (Math.round(state.rightMouth.x) === 170) {
          setDetecStatus('face');
          Animated.timing(buttonPosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
          }).start();
        }
        if (Math.round(state.rightMouth.x) === 169) {
          setDetecStatus('face');
          Animated.timing(buttonPosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
          }).start();
        }
        if (Math.round(state.rightMouth.x) === 168) {
          setDetecStatus('face');
          Animated.timing(buttonPosition, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
          }).start();
        } else {
        }
      }
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        onFacesDetected={(res) => handlePosition(res)}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}>
              <TouchableOpacity
                onPress={() => navigation.replace('Home')}
                style={styles.backButton}>
                <Icon
                  name="chevron-left"
                  color={colors.background.yellow}
                  size={24}
                />
              </TouchableOpacity>
              <View style={styles.canvas} />
              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: buttonPosition,
                  width: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}>
                  <Text style={styles.captureText}>Take Photo</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        }}
      </RNCamera>
    </>
  );
}

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size={24} color="red" />
  </View>
);

export default FaceRecognition;

const styles = StyleSheet.create({
  scanContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scanner: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'gray',
    alignSelf: 'center',
    top: '20%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'red',
    padding: 16,
  },
  capture: {
    backgroundColor: colors.background.orange,
    borderRadius: 5,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureText: {
    fontSize: 14,
    color: colors.text.white,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  canvas: {
    borderWidth: 4,
    borderColor: colors.border.focuse,
    height: 400,
    width: 280,
    position: 'absolute',
    top: 24,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
