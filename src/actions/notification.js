export const showNotification = text => dispatch => {
  dispatch({
    type: 'SHOW_NOTIFICATION',
    payload: text,
  });

  setTimeout(() => {
    dispatch({ type: 'HIDE_NOTIFICATION' })
  }, 4000)
};