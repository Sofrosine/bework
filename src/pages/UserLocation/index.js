import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '../../components';
import {colors} from '../../utils';
import {useSelector} from 'react-redux';

const UserLocation = ({navigation, route}) => {
  const {status} = route.params;
  const {latitude, longitude} = useSelector(
    (state) => state.currentLocationReducer,
  );
  return (
    <View style={{flex: 1}}>
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
            navigation.navigate('FaceRecognition', {status});
          }}
          text="Konfirmasi Lokasi"
        />
      </View>
    </View>
  );
};

export default UserLocation;

const styles = StyleSheet.create({});
