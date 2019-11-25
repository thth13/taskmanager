import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setSortDirection, setSortField } from '../../../actions/params';

import './SortButtons.css';

const SortButtons = props => {
  const setSort = e => {
    const { name } = e.target;

    if (name === 'asc' || name === 'desc') {
      props.setSortDirection(name);
    } else {
      props.setSortField(name);
    }
  };
  
  const { params } = props;

  return (
    <Fragment>
      <div className="sortGroup">
        <p>Сортировать по:</p>
        <button
          name="id"
          onClick={setSort}
          className={
            params.sort_field === 'id' ? 'selectedButton' : ''
          }
        >
          ID
        </button>
        <button
          name="username"
          onClick={setSort}
          className={
            params.sort_field === 'username' ? 'selectedButton' : ''
          }
        >
          Имя пользователя
        </button>
        <button
          name="email"
          onClick={setSort}
          className={
            params.sort_field === 'email' ? 'selectedButton' : ''
          }
        >
          Email
        </button>
        <button
          name="status"
          onClick={setSort}
          className={
            params.sort_field === 'status' ? 'selectedButton' : ''
          }
        >
          Статус
        </button>
      </div>
      <div className="sortGroup">
        <p>Направление сортировки:</p>
        <button
          name="asc"
          onClick={setSort}
          className={
            params.sort_direction === 'asc' ? 'selectedButton' : ''
          }
        >
          ASC
        </button>
        <button
          name="desc"
          onClick={setSort}
          className={
            params.sort_direction === 'desc' ? 'selectedButton' : ''
          }
        >
          DESC
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  params: state.params,
});

SortButtons.propTypes = {
  params: PropTypes.object.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  setSortField: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps, 
  { setSortDirection, setSortField }
)(SortButtons);
