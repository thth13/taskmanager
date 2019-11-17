import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../../actions/auth';

import './UserInfo.css';

const UserInfo = props => {
  const logout = () => {
    props.logoutUser();
  }

  return (
    <div className="profile">
      {props.auth.isAuth ? (
        <Fragment>
          <span className="profile-userName">admin</span>
          <span className="profile-logout" onClick={logout}>Выход</span>
        </Fragment>
      ) : (
        <Fragment>
          <span className="profile-unauthorized">Не авторизирован</span>
          <Link to="/signin">
            <button>Войти</button>
          </Link>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

UserInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserInfo);
