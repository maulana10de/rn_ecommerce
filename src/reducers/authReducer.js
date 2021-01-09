const INITIAL_STATE = {
  iduser: null,
  fullName: '',
  username: '',
  email: '',
  role: '',
  loading: false,
  isLogin: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        iduser: action.payload.iduser,
        fullName: action.payload.fullName,
        username: action.payload.username,
        email: action.payload.email,
        role: action.payload.role,
        loading: false,
        isLogin: true,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'USER_LOGIN_FAIL':
      return INITIAL_STATE;
    default:
      return state;
  }
};
