const initialState = {
  developer: 'thth',
  sort_field: 'id',
  sort_direction: 'desc',
  page: 1,
};

const params = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_FIELD':
      return {
        ...state,
        sort_field: action.payload,
        page: 1,
      };
    case 'SET_SORT_DIRECTION':
      return {
        ...state,
        sort_direction: action.payload,
        page: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default params;
