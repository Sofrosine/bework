import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Firebase} from '../../config';
import {colors} from '../../utils';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('Login');
        }
      }, 1000);
    });

    return () => unsubscribe();
  }, [navigation]);
  return <View style={styles.pages} />;
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
});
