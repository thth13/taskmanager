const initialState = '';

const form = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPEN_FORM':
      return action.payload;
    default:
      return state;
  }
};

export default form;
