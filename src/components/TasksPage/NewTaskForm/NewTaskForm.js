import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { addTask } from '../../../actions/tasks';
import { setOpenForm } from '../../../actions/form';

import './NewTaskForm.css';

class NewTaskForm extends Component {
  state = {
    username: '',
    email: '',
    text: '',
    errors: {},
  };

  setOpenForm = e => {
    const { setOpenForm } = this.props;

    this.setState({
      username: '',
      email: '',
      text: '',
      errors: {},
    });

    setOpenForm(e.target.id);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addTask = e => {
    e.preventDefault();
    const { username, email, text } = this.state;
    const { setOpenForm, addTask } = this.props;
    const errors = {};
    
    if (username.length < 1) {
      errors.username = true;
    }
    if (email.length < 1) {
      errors.email = true;
    } else {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        errors.email = 'uncorrect';
      }
    }
    if (text.length < 1) {
      errors.text = true;
    }
    if (errors.name || errors.email || errors.text) {
      this.setState({ errors: errors });
    } else {
      const newTask = { username, email, text };

      addTask(newTask, this.props.params);
      setOpenForm('');
    }
  };

  render() {
    const { username, email, text, errors } = this.state;
    const { form } = this.props;
    
    return (
      <Fragment>
        <div className="newTaskBody">
          {form === 'newTask' ? (
            <form onSubmit={this.addTask} className="newTaskForm">
              {(errors.username || errors.email === true || errors.text) && (
                <span className="errorNewTask-label">Нужно заполнить все поля</span>
              )}
              {errors.email === 'uncorrect' && (
                <span className="errorNewTask-label">Введите корректный email</span>
              )}
              <input
                value={username}
                onChange={this.handleChange}
                name="username"
                autoFocus
                placeholder="Имя пользователя"
                className={classnames('newTask-field', {
                  'newTask-fieldError': errors.username,
                })}
              />
              <input
                value={email}
                onChange={this.handleChange}
                name="email"
                placeholder="Email"
                className={classnames('newTask-field', {
                  'newTask-fieldError': errors.email,
                })}
              />
              <input
                value={text}
                onChange={this.handleChange}
                name="text"
                placeholder="Задача"
                className={classnames('newTask-field', {
                  'newTask-fieldError': errors.text,
                })}
              />
              <div className="actionButtons">
                <button className="saveButton" type="submit">
                  Сохранить
                </button>
                <button className="cancelButton" onClick={this.setOpenForm}>
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div
              id="newTask"
              onClick={this.setOpenForm}
              className="newTaskField"
            >
              <span id="newTask" onClick={this.setOpenForm}>
                Задача...
              </span>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
  params: state.params,
});

NewTaskForm.propTypes = {
  form: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  setOpenForm: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, 
  { setOpenForm, addTask }
)(NewTaskForm);
