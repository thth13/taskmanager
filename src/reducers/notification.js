const initialState = [];

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'REMOVE_NOTIFICATION':
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
};

export default notifications;
