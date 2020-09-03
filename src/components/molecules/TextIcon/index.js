import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';

const TextIcon = ({text, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {icon}
      <Gap width={8} />
      <Text style={styles.buttonSecondary}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSecondary: {
    color: colors.text.secondary,
    fontSize: 16,
    fontFamily: fonts.primary[600],
  },
});
