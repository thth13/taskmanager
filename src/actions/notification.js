export const showNotification = data => dispatch => {
  dispatch({
    type: 'NEW_NOTIFICATION',
    payload: data,
  });

  setTimeout(() => {
    dispatch({ type: 'REMOVE_NOTIFICATION' })
  }, 4000)
};