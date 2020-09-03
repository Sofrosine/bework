import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors, fonts} from '../../../utils';

const Loading = () => {
  const {loadingReducer} = useSelector((state) => state);
  const {loadingText} = loadingReducer;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.background.loading} />
      <ActivityIndicator size="large" color={colors.text.secondary} />
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: colors.background.loading,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 16,
  },
});
