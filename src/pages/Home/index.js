import GeoLocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Divider, Gap} from '../../components';
import {HistoryAttendance} from '../../components/molecules';
import {Firebase} from '../../config';
import {colors, flexStyle, fonts} from '../../utils';
import {useDispatch} from 'react-redux';
import {getCurrentLocationAction} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({navigation}) => {
  const [update, setUpdate] = useState(false);
  const [nowDate, setNowDate] = useState('');
  const [user, setUser] = useState({
    name: '',
    location: '',
    today_attendance: '',
    hasFace: '', 
  });
  const user_id = Firebase.auth().currentUser.uid;
  const signOut = () => {
    Firebase.auth().signOut();
    AsyncStorage.clear();
    navigation.replace('Login');
  };

  const handleLogout = () => {
    Alert.alert('Keluar', 'Apakah Anda yakin ingin keluar?', [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: signOut},
    ]);
  };

  const gettingData = async () => {
    // const data = await getData('user');
    const data = await Firebase.database()
      .ref(`/users/${user_id}`)
      .once('value');
    await setUser(data.val());
    // console.log('nowww', await getData('@in'));
    // console.log('user data', user);
  };
  const dispatch = useDispatch();
  function convertTimestamptoTime(timestamp) {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
      yyyy = d.getFullYear(),
      mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
      dd = ('0' + d.getDate()).slice(-2), // Add leading 0.
      hh = d.getHours(),
      h = hh,
      min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
      ampm = 'AM',
      day = d.getDay(),
      time;
    let date;

    if (mm == '01') {
      mm = 'Januari';
    }
    if (mm == '02') {
      mm = 'Februari';
    }
    if (mm == '03') {
      mm = 'Maret';
    }
    if (mm == '04') {
      mm = 'April';
    }
    if (mm == '05') {
      mm = 'Mei';
    }
    if (mm == '06') {
      mm = 'Juni';
    }
    if (mm == '07') {
      mm = 'Juli';
    }
    if (mm == '08') {
      mm = 'Agustus';
    }
    if (mm == '09') {
      mm = 'September';
    }
    if (mm == '10') {
      mm = 'Oktober';
    }
    if (mm == '11') {
      mm = 'November';
    }
    if (mm == '12') {
      mm = 'Desember';
    }

    // ie: 2013-02-18, 8:35 AM
    date = dd + '-' + mm + '-' + yyyy;
    time = h + ':' + min + ' ' + ampm;

    setNowDate(`${dd} ${mm} ${yyyy}`);

    return {day, date, time};
  }
  useEffect(() => {
    convertTimestamptoTime(new Date().getTime());
    gettingData();
    dispatch(getCurrentLocationAction());
  }, []);

  return (
    <SafeAreaView style={styles.pages}>
      <ScrollView>
        <Gap height={24} />
        <TouchableOpacity
          onPress={handleLogout}
          style={{alignSelf: 'flex-end', padding: 8}}>
          <Icon name="power-off" size={24} color={colors.background.danger} />
        </TouchableOpacity>
        <Gap height={24} />
        <View style={flexStyle.alignItemsCenter}>
          <Text style={styles.h6Secondary}>
            {user && user.name ? user.name : 'Name not found'}
          </Text>
          <Text style={styles.h6Secondary}>
            {user && user.location ? user.location : 'Location not found'}
          </Text>
          <Text style={styles.h6Secondary}>{nowDate}</Text>
        </View>
        <Gap height={40} />
        <Button
          onPress={
            user && !user.today_attendance
              ? user.hasFace
                ? () =>
                    navigation.navigate('UserLocation', {status: 'check-in'})
                : () =>
                    navigation.navigate('FaceRecognition', {status: 'register'})
              : () => navigation.navigate('UserLocation', {status: 'check-out'})
          }
          text={
            user && !user.today_attendance
              ? user.hasFace
                ? 'Check In'
                : 'Daftarkan Wajah'
              : 'Check Out'
          }
        />
        <Divider top={40} bottom={24} />
        <Text style={styles.h5Primary}>Histori Absensi</Text>
        <Gap height={16} />
        <HistoryAttendance update={update} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingHorizontal: 16,
  },
  h6Secondary: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    color: colors.text.secondary,
  },
  h5Primary: {
    fontSize: 22,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  p1Primary: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  modalAlert: {
    backgroundColor: colors.background.white,
    padding: 16,
    margin: 16,
  },
  marker: {
    position: 'absolute',
    zIndex: 9999,
    alignSelf: 'center',
    top: '42%',
  },
});
