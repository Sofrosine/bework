import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../utils';

const Divider = ({color, top, bottom}) => {
  return <View style={styles.divider(color, top, bottom)} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: (color, top, bottom) => ({
    borderBottomWidth: 1,
    borderBottomColor: colors.border.blur,
    marginTop: top,
    marginBottom: bottom,
  }),
});
