import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Gap} from '../../components';
import {colors} from '../../utils';
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentLocationAction} from '../../redux/actions';

const UserLocation = ({navigation, route}) => {
  const {status} = route.params;
  const {latitude, longitude} = useSelector(
    (state) => state.currentLocationReducer,
  );
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.replace('Home')}
        style={styles.backButton}>
        <Icon name="chevron-left" color={colors.background.yellow} size={24} />
      </TouchableOpacity>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        <Marker
          icon={
            <Icon
              name="map-marker"
              color={colors.background.yellow}
              size={48}
            />
          }
          coordinate={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        />
      </MapView>
      <View style={{padding: 16}}>
        {/* <Button onPress={handleInAttendance} text="Konfirmasi Lokasi" /> */}
        <Button
          onPress={() => {
            navigation.replace('FaceRecognition', {status});
          }}
          text="Konfirmasi Lokasi"
        />
        <Gap height={8} />
        <Button
          onPress={() => {
            dispatch(getCurrentLocationAction());
          }}
          text="Ambil Ulang Lokasi"
        />
      </View>
    </View>
  );
};

export default UserLocation;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 9999,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
