import axios from 'axios';

const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=thth';

export const signIn = (user, history) => dispatch => {
  const formData = new FormData();

  formData.append('username', user.name);
  formData.append('password', user.password);

  axios.post(url, formData)
  .then(res => {
    if (res.data.status === 'error') {
      dispatch({
        type: 'GET_ERRORS',
        payload: res.data.message
      });
    } else {
      const { token } = res.data.message;
      const expDate = Date.now() + 86400000;

      localStorage.setItem('token', token);
      localStorage.setItem('expDateToken', expDate);

      dispatch(setCurrentUser(token));

      history.push('/');
    }
  })
  .catch(err => console.log(err));
};

export const setCurrentUser = token => {
  return {
      type: 'SET_CURRENT_USER',
      payload: token
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(setCurrentUser(''));
};

export const clearErrors = () => {
  return {
    type: 'CLEAR_ERRORS'
  };
};