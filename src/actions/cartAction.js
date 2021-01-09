import Axios from 'axios';
import {APIURL} from '../utils/api_urls';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

export const addToCart = (data) => {
  return async (dispatch) => {
    try {
      let results = await Axios.post(APIURL + `/cart/add`, {...data});
      dispatch({
        type: 'GET_CART',
        payload: results.data.dataCart,
      });
      Alert.alert(results.data.message);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCart = (iduser) => {
  return async (dispatch) => {
    try {
      let results = await Axios.get(APIURL + `/cart?iduser=${iduser}`);
      dispatch({
        type: 'GET_CART',
        payload: results.data.dataCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onUpdateQtyCart = (qty, type, idcart, iduser) => {
  return async (dispatch) => {
    try {
      if (type == 'inc') {
        qty += 1;
      } else if (type == 'dec') {
        qty -= 1;
      }

      let token = await AsyncStorage.getItem('userToken');

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let results = await Axios.patch(
        APIURL + `/cart/update/${idcart}/${iduser}`,
        {qty},
        headers,
      );

      dispatch({
        type: 'GET_CART',
        payload: results.data.dataCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNote = (idx, note) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'ADD_NOTE',
        payload: {idx, note},
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const onHandleCheckOut = (checkout, idcart, iduser, totalPayment) => {
  return async (dispatch) => {
    try {
      let results = await Axios.post(APIURL + `/transaction/checkout`, {
        checkout,
        idcart,
        iduser,
        totalPayment,
      });
      dispatch({
        type: 'CHECKOUT',
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTransaction = (iduser) => {
  return async (dispatch) => {
    try {
      let results = await Axios.get(APIURL + `/transaction/${iduser}`);
      dispatch({
        type: 'GET_TRX',
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTrxDetail = (idtransaction) => {
  return async (dispatch) => {
    try {
      let results = await Axios.get(
        APIURL + `/transaction/trx-detail/${idtransaction}`,
      );
      dispatch({
        type: 'GET_TRX_DETAIL',
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePaymentStatus = (idtransaction, iduser) => {
  return async (dispatch) => {
    try {
      console.log('Test', idtransaction);
      let results = await Axios.patch(
        APIURL + `/transaction/payment/${iduser}/${idtransaction}`,
      );
      dispatch({
        type: 'GET_TRX',
        payload: results.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
