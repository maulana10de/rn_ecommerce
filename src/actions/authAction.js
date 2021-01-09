import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import {Alert} from 'react-native';
import {APIURL} from '../utils/api_urls';

export const onRegister = (data) => {
  return async (dispatch) => {
    try {
      dispatch({type: 'LOADING'});
      let get = await Axios.post(APIURL + `/users/register`, data);
      dispatch({
        type: 'USER_LOGIN',
        payload: get.data.loginData,
      });
      await AsyncStorage.setItem('userToken', get.data.loginData.token);
      Alert.alert('Registration Successfull');
    } catch (error) {
      dispatch({type: 'USER_LOGIN_FAIL'});
      console.log(error);
    }
  };
};

export const onLogin = ({username, password}) => {
  return async (dispatch) => {
    try {
      dispatch({type: 'LOADING'});
      let get = await Axios.get(
        APIURL + `/users/login?username=${username}&password=${password}`,
      );
      dispatch({
        type: 'USER_LOGIN',
        payload: get.data.loginData,
      });
      await AsyncStorage.setItem('userToken', get.data.loginData.token);
    } catch (error) {
      dispatch({type: 'USER_LOGIN_FAIL'});
      console.log(error);
    }
  };
};

export const onKeepLogin = () => {
  return async (dispatch) => {
    try {
      let token = await AsyncStorage.getItem('userToken');
      if (token) {
        const headers = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let get = await Axios.get(APIURL + `/users/keepLogin`, headers);
        dispatch({
          type: 'USER_LOGIN',
          payload: get.data.dataKeepLogin,
        });
        await AsyncStorage.setItem('userToken', get.data.dataKeepLogin.token);
      }
    } catch (error) {
      dispatch({type: 'USER_LOGIN_FAIL'});
    }
  };
};

export const onLogout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch({
        type: 'USER_LOGIN_FAIL',
      });
    } catch (error) {
      console.log(error);
    }
  };
};
