import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Notification from './Notification';

import './Notifications.css';

const NotificationsList = props => (
  <div className="notificationsList">
    {props.notification.map(item => (
      <Notification key={item.id} notification={item} />
    ))}
  </div>
);

const mapStateToProps = state => ({
  notification: state.notification,
});

NotificationsList.propTypes = {
  notification: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, {})(NotificationsList);
