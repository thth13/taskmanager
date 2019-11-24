import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editTask } from '../../../actions/tasks';
import { setOpenForm } from '../../../actions/form';

import './Task.css';

class TaskItem extends Component {
  state = {
    editField: this.props.task.text,
    isEditedByAdmin: false,
  };

  setEdit = e => {
    this.props.setOpenForm(e.target.id);
  };

  onChange = e => {
    this.setState({ editField: e.target.value });
  };

  editTask = e => {
    e.preventDefault();
    const { editField } = this.state;
    const { editTask, task, setOpenForm, params } = this.props;
    
    let newStatus = task.status;

    if (e.target.name === 'editStatusButton') {
      if (task.status === 10) {
        newStatus = 0;
      } else {
        newStatus = 10;
      }
    } else {
      //////////////////////////////////////////////////////////////////////////////
      // Метку "отредактирвоано администратором" смог сделать только так
      // После обновления страницы она будет исчезать
      // Пытался с помощью status сохранять инфу о редактировании, но там можно только 0 и 10 указать
      //////////////////////////////////////////////////////////////////////////////
      this.setState({ isEditedByAdmin: true });
    }

    const data = {
      text: editField,
      id: task.id,
      status: newStatus,
    };

    editTask(data, params.developer);
    setOpenForm('');
  };

  render() {
    const { username, email, text, status, id } = this.props.task;
    const { isAuth } = this.props.auth;
    const { form } = this.props;
    const { editField, isEditedByAdmin } = this.state;

    return (
      <div className="taskItem">
        <div className="taskItem-group">
          {form === id.toString() ? (
            <form onSubmit={this.editTask}>
              <input
                className="taskText-input"
                value={editField}
                onChange={this.onChange}
              />
              <div className="actionButtons">
                <button
                  className="saveButton"
                  type="submit"
                  onClick={this.editTask}
                >
                  Сохранить
                </button>
                <button className="cancelButton" onClick={this.setEdit}>
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <Fragment>
              <div className="taskText">
                <span className="taskInfo-label">Текст задачи:</span>
                {text.length > 2000 ? <p className="errorTextSize">Ошибка! Текст задачи содержит больше 2000 символов</p> : <p>{text}</p>}
              </div>
              {isAuth && (
                <div className="taskItem-actions">
                  <button
                    name="editStatusButton"
                    onClick={this.editTask}
                  >
                    {status === 0 ? 'Выполнено' : 'Не выполнено'}
                  </button>
                  <button id={id} onClick={this.setEdit}>
                    Редактировать
                  </button>
                </div>
              )}
            </Fragment>
          )}
        </div>
        {isEditedByAdmin && (
          <span className="editByAdmin"> Отредактировано администратором</span>
        )}
        <div className="taskInfo">
          <span className="taskInfo-label">
            Имя пользователя: <span>{username}</span>
          </span>
          <span className="taskInfo-label">
            email: <span>{email}</span>
          </span>
          <span className="taskInfo-label">
            Статус:
            {status === 10 || status === 5 ? (
              <span className="complete">выполнено</span>
            ) : (
              <span className="uncomplete">не выполнено</span>
            )}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  form: state.form,
  params: state.params
});

TaskItem.propTypes = {
  auth: PropTypes.object.isRequired,
  form: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
  setOpenForm: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps, 
  { editTask, setOpenForm }
)(TaskItem);