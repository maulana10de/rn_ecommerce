import {Alert} from 'react-native';

const INITIAL_STATE = {
  products: [],
  searchProducts: [],
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      // console.log('reducer search', action.payload);
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case 'GET_SEARCH_PRODUCTS':
      console.log('reducer search', action.payload.length);
      if (action.payload.length > 0) {
        return {
          ...state,
          searchProducts: action.payload,
          isLoading: true,
        };
      } else {
        Alert.alert('Product tidak ditemukan');
      }

    case 'CLEAR_SEARCH_PRODUCTS':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
