import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const Button = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.buttonWhite}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button.primary,
    height: 56,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWhite: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.white,
  },
});
