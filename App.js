import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {useSelector, Provider} from 'react-redux';
import {Loading} from './src/components/molecules';
import Router from './src/router';
import {colors} from './src/utils';
import configureStore from './src/redux/store';

const MainApp = () => {
  const {loadingReducer} = useSelector((state) => state);
  return (
    <>
      <StatusBar backgroundColor={colors.background.white} />
      <Router />
      {loadingReducer.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
