import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import success from '../../../img/success.svg';
import error from '../../../img/error.svg';

import './Notifications.css';

const Notifications = props => (
  <div className="notificationBlock">
    {props.notification.map(notif => (
      <div key={notif.text} className="notification">
        {notif.type === 'error' && (
          <img src={error} alt="errorIcon" className="notificationImage" />
        )}
        {notif.type === 'success' && (
          <img src={success} alt="successIcon" className="notificationImage" />
        )}
        {notif.text}
      </div>
    ))}
  </div>
);

const mapStateToProps = state => ({
  notification: state.notification,
});

Notifications.propTypes = {
  notification: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {})(Notifications);
