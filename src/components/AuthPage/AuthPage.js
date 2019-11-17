import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signIn, logoutUser, clearErrors } from '../../actions/auth';

import './AuthPage.css';

class AuthPage extends Component {
  state = {
    name: '',
    password: '',
    errors: {},
  };

  componentDidMount = () => {
    const { isAuth } = this.props.auth;

    if (isAuth) {
      this.props.history.push('/');
    }
  };
  
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (Object.keys(nextProps.errors).length !== 0) {
      return {
        errors: nextProps.errors
      }
    }

    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, password } = this.state;
    const { history, clearErrors } = this.props;
    
    const errors = {};
    clearErrors();

    if (name.length < 1) {
      errors.name = 'Введите логин';
    }
    if (password.length < 1) {
      errors.password = 'Введите пароль';
    }
    if (errors.name || errors.password) {
      this.setState({ errors: errors });
    } else {
      this.setState({ errors: {} });

      const user = { name, password };

      this.props.signIn(user, history);
    }
  };

  render() {
    const { errors, name, password } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="login-form">
        <h2 className="enter-text">Вход</h2>
        <input
          className="login-input error"
          placeholder="Логин"
          type="text"
          name="name"
          value={name}
          onChange={this.onChange}
          style={errors.name ? { borderColor: 'red' } : {}}
        />
        {errors.name && <span className="error-label">{errors.name}</span>}
        <input
          className="login-input error"
          placeholder="Пароль"
          type="password"
          name="password"
          value={password}
          onChange={this.onChange}
          style={errors.password ? { borderColor: 'red' } : {}}
        />
        {errors.password && <span className="error-label">{errors.password}</span>}
        <button type="submit">Войти</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

AuthPage.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { signIn, logoutUser, clearErrors }
)(AuthPage);
