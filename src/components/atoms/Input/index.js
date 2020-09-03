import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({label, value, onChangeText, secureTextEntry, disable}) => {
  const [border, setBorder] = useState(colors.border.blur);
  const [labelColor, setLabelColor] = useState(colors.text.primary);
  const onFocusForm = () => {
    setBorder(colors.border.focuse);
    setLabelColor(colors.text.secondary);
  };
  const onBlurForm = () => {
    setBorder(colors.border.blur);
    setLabelColor(colors.text.primary);
  };
  return (
    <View>
      <Text style={styles.label(labelColor)}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: (labelColor) => ({
    fontFamily: fonts.primary[500],
    color: labelColor,
    fontSize: 16,
    marginBottom: 6,
  }),
});
