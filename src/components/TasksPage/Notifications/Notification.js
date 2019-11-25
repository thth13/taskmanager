import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import success from '../../../img/success.svg';
import error from '../../../img/error.svg';

import './Notifications.css';

class Notification extends Component {
  state = {
    showMessage: false,
  };

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({ showMessage: false });
    }, 3500);

    this.setState({
      showMessage: true,
      timer: timer,
    });
  }

  componentWillUnmount() {
    const { timer } = this.state;

    clearInterval(timer);
  }

  render() {
    const { showMessage } = this.state;
    const { notification } = this.props;

    return (
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="animNotification"
        unmountOnExit
      >
        <div className="notification">
          {notification.type === 'error' && (
            <img src={error} alt="errorIcon" className="notificationImage" />
          )}
          {notification.type === 'success' && (
            <img
              src={success}
              alt="successIcon"
              className="notificationImage"
            />
          )}
          {notification.text}
        </div>
      </CSSTransition>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
