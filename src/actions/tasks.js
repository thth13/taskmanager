import axios from 'axios';
import { showNotification } from './notification';

const url = 'https://uxcandy.com/~shapoval/test-task-backend/v2';

export const loadTasks = params => dispatch => {
  axios.get(url, {
    params: params
  })
  .then(res =>
    dispatch({
      type: 'LOAD_TASKS',
      payload: res.data.message
    }) 
  )
  .catch(err => {
    dispatch(showNotification({
      type: 'error', 
      text: 'Ошибка! Невозможно загрузить задачи'
    }));
    console.log(err);
  });
};

export const editTask = (task, developer) => dispatch => {
  const formData = new FormData();

  formData.append('text', task.text);
  formData.append('token', localStorage.token);
  formData.append('status', task.status);

  axios.post(`${url}/edit/${task.id}?developer=${developer}`, formData)
    .then(res => {
      if (res.data.status === 'error') {
        dispatch(showNotification({
          type: 'error', 
          text: 'Ошибка! Не удалось отредактировать задачу'
        }));
        console.log(res.data.message);
      }
      dispatch({
        type: 'EDIT_TASK',
        payload: task
      })
    })
    .catch(err => {
      dispatch(showNotification({
          type: 'error', 
          text: 'Ошибка! Не удалось отредактировать задачу'
        }));
      console.log(err);
    })
};

export const addTask = (task, params) => dispatch => {
  const formData = new FormData();

  formData.append('username', task.username);
  formData.append('email', task.email);
  formData.append('text', task.text);

  axios.post(`${url}/create?developer=${params.developer}`, formData)
    .then(res => {
      if (res.data.status === 'error') {
        dispatch(showNotification({
          type: 'error', 
          text: 'Ошибка! Не удалось добавить задачу'
        }));
        console.log(res.data.message);
      } else {
        dispatch(loadTasks(params));

        dispatch(showNotification({
          type: 'success', 
          text: 'Задача успешено добавлена'
        }));
      }

    })
    .catch(err => {
      dispatch(showNotification({
        type: 'error', 
        text: 'Ошибка. Не удалось добавить задачу'
      }));
      console.log(err)
    });
};