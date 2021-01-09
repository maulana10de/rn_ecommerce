import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/reducers';
import {createStore, applyMiddleware} from 'redux';
import {ModalPortal} from 'react-native-modals';

const App = (props) => {
  return (
    <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
      <NavigationContainer>
        <MainNavigation />
        <ModalPortal />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
