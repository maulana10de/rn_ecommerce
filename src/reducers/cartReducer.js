const INITIAL_STATE = {
  cartUser: [],
  totalPayment: 0,
  totalQty: 0,
  success: false,
  error: '',
  message: '',
  isGetCart: false,
  trx: [],
  trxDetail: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CART':
      let total = 0;
      let totalQty = 0;
      action.payload.forEach((e) => {
        total += e.qty * e.price;
        totalQty += e.qty;
      });
      console.log('reducer', action.payload, totalQty);
      return {
        ...state,
        cartUser: action.payload,
        totalPayment: total,
        totalQty: totalQty,
        success: false,
        isGetCart: true,
      };
    case 'ADD_NOTE':
      // console.log('data reducer cart', action.payload);
      state.cartUser[action.payload.idx].note = action.payload.note;
      return {
        ...state,
        cartUser: state.cartUser,
      };
    case 'CHECKOUT':
      // console.log('data checkout', action.payload);
      return {
        ...state,
        success: action.payload.success,
        error: action.payload.error,
        message: action.payload.message,
      };
    case 'GET_TRX':
      // console.log('r trx', actrion.payload);
      return {
        ...state,
        trx: action.payload,
        loading: true,
      };
    case 'GET_TRX_DETAIL':
      // console.log('r trx', actrion.payload);
      return {
        ...state,
        trxDetail: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};
