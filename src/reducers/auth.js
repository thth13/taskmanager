import isEmpty from '../utils/is-empty';

const initialState = {
  isLoggedIn: false,
  token: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isLoggedIn: !isEmpty(action.payload),
        token: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
