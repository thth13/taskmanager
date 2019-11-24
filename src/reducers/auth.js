import isEmpty from '../utils/is-empty';

const initialState = {
  isAuth: false,
  token: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuth: !isEmpty(action.payload),
        token: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
