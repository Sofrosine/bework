import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ILLogin} from '../../assets';
import {Button, Gap, Input} from '../../components';
import {Firebase} from '../../config';
import {colors, fonts, storeData, useForm} from '../../utils';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../../redux/actions';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      dispatch(setLoadingAction(true, 'Sedang Memproses...'));
      const loginData = await Firebase.auth().signInWithEmailAndPassword(
        form.email,
        form.password,
      );
      const userData = await Firebase.database()
        .ref(`/users/${loginData.user.uid}`)
        .once('value');
      await storeData('user', userData.val());
      dispatch(setLoadingAction(false));
      navigation.replace('Home');
    } catch (e) {
      showMessage({
        message: e.message,
        type: 'default',
        backgroundColor: colors.background.danger,
        color: colors.text.white,
      });
      console.log('error', e);
      dispatch(setLoadingAction(false));
    }
  };
  return (
    <SafeAreaView style={styles.pages}>
      <ILLogin style={styles.illustration} height={200} width={200} />
      <Gap height={24} />
      <Text style={styles.h5Primary}>Selamat Datang,</Text>
      <Text style={styles.h5Primary}>Silahkan Masuk</Text>
      <Gap height={24} />
      <Input onChangeText={(value) => setForm('email', value)} label="Email" />
      <Gap height={16} />
      <Input
        onChangeText={(value) => setForm('password', value)}
        label="Password"
        secureTextEntry
      />
      <Gap height={44} />
      <Button onPress={handleLogin} text="Login" />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background.white,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  illustration: {
    alignSelf: 'center',
  },
  h5Primary: {
    fontFamily: fonts.primary[700],
    fontSize: 20,
    color: colors.text.secondary,
  },
});
