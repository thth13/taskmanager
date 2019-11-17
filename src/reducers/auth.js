const initialState = {
  isAuth: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuth: !state.isAuth,
      };
    default:
      return state;
  }
};

export default auth;
