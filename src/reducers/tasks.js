const initialState = {
  tasks: [],
  pages: 0,
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_TASKS':
      return {
        tasks: action.payload.tasks,
        pages: Math.ceil(action.payload.total_task_count / 3),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                text: action.payload.text,
                status: action.payload.status,
              }
            : item
        ),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export default tasks;
