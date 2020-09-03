import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Firebase} from '../../../config';
import {colors, flexStyle, fonts} from '../../../utils';

const HistoryAttendance = ({update}) => {
  const [attendance, setAttendance] = useState([]);
  const getAttendance = async () => {
    const uid = await Firebase.auth().currentUser.uid;
    Firebase.database()
      .ref(`user_attendance/${uid}`)
      .on('value', (snapshot) => {
        const arr = [];
        snapshot.forEach((child) => {
          arr.push(child.val());
        });
        setAttendance(arr);
      });
  };

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

    if (hh > 12) {
      h = hh - 12;
      ampm = 'PM';
    } else if (hh === 12) {
      h = 12;
      ampm = 'PM';
    } else if (hh == 0) {
      h = 12;
    }
    if (day == 0) {
      day = 'Minggu';
    }
    if (day == 1) {
      day = 'Senin';
    }
    if (day == 2) {
      day = 'Selasa';
    }
    if (day == 3) {
      day = 'Rabu';
    }
    if (day == 4) {
      day = 'Kamis';
    }
    if (day == 5) {
      day = 'Jumat';
    }
    if (day == 6) {
      day = 'Sabtu';
    }

    // ie: 2013-02-18, 8:35 AM
    date = dd + '-' + mm + '-' + yyyy;
    time = h + ':' + min + ' ' + ampm;

    return {day, date, time};
  }

  useEffect(() => {
    getAttendance();
  }, [update]);

  return (
    <ScrollView horizontal contentContainerStyle={{width: '100%'}}>
      <View style={{width: '100%'}}>
        <View style={[flexStyle.rowJustifyCenter, {width: '100%'}]}>
          <View style={[styles.tabTitle, {width: '40%'}]}>
            <Text style={styles.p2White}>Tanggal</Text>
          </View>
          <View style={styles.tabTitle}>
            <Text style={styles.p2White}>Masuk</Text>
          </View>
          <View style={styles.tabTitle}>
            <Text style={styles.p2White}>Pulang</Text>
          </View>
          {/* <View style={styles.tabTitle}>
            <Text style={styles.p2White}>Interval</Text>
          </View> */}
        </View>
        {attendance.length < 1 ? (
          <View style={[flexStyle.alignSelfCenter, {padding: 24}]}>
            <Text style={styles.buttonPrimary}>History Data Kosong</Text>
          </View>
        ) : (
          attendance.map((attend, key) => {
            return (
              <View
                style={[flexStyle.rowJustifyCenter, {width: '100%'}]}
                key={key}>
                <View style={[styles.tabItem, {width: '40%'}]}>
                  <Text style={styles.p2White}>
                    {convertTimestamptoTime(attend.in).day},{' '}
                    {convertTimestamptoTime(attend.in).date}
                  </Text>
                </View>
                <View style={styles.tabItem}>
                  <Text style={styles.p2White}>
                    {convertTimestamptoTime(attend.in).time}
                  </Text>
                </View>
                <View style={styles.tabItem}>
                  <Text style={styles.p2White}>
                    {attend.out ? convertTimestamptoTime(attend.out).time : '-'}
                  </Text>
                </View>
                {/* <View style={styles.tabItem}>
                  <Text style={styles.p2White}>
                    {convertTimestamptoTime(attend.in).time -
                      convertTimestamptoTime(attend.out).time}
                    Jam
                  </Text>
                </View> */}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryAttendance;

const styles = StyleSheet.create({
  tabTitle: {
    backgroundColor: colors.background.orange,
    padding: 8,
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    backgroundColor: colors.background.yellow,
    padding: 8,
    width: '30%',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  p2White: {
    fontSize: 12,
    color: colors.text.white,
    fontFamily: fonts.primary[600],
  },
  buttonPrimary: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});
