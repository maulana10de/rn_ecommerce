import Axios from 'axios';
import {Alert} from 'react-native';
import {APIURL} from '../utils/api_urls';

export const getProducts = () => {
  return async (dispatch) => {
    try {
      let products = await Axios.get(APIURL + `/products`);
      dispatch({
        type: 'GET_PRODUCTS',
        payload: products.data.dataProducts,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getSearch = (search) => {
  console.log(search);
  return async (dispatch) => {
    try {
      if (search === '') {
        Alert.alert('Required field is missing');
      } else {
        let results = await Axios.get(APIURL + `/products/search?q=${search}`);
        dispatch({
          type: 'GET_SEARCH_PRODUCTS',
          payload: results.data.searchResults,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearSearch = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'CLEAR_SEARCH_PRODUCTS',
      });
    } catch (error) {
      console.log(error);
    }
  };
};
