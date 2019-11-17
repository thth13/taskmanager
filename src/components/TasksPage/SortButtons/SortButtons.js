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

  return (
    <Fragment>
      <div className="sortGroup">
        <p>Сортировать по:</p>
        <button
          name="id"
          onClick={setSort}
          style={
            props.params.sort_field === 'id'
              ? { borderBottom: '2px solid royalblue' }
              : {}
          }
        >
          ID
        </button>
        <button
          name="username"
          onClick={setSort}
          style={
            props.params.sort_field === 'username'
              ? { borderBottom: '2px solid royalblue' }
              : {}
          }
        >
          Имя пользователя
        </button>
        <button
          name="email"
          onClick={setSort}
          style={
            props.params.sort_field === 'email'
              ? { borderBottom: '2px solid royalblue' }
              : {}
          }
        >
          Email
        </button>
        <button
          name="status"
          onClick={setSort}
          style={
            props.params.sort_field === 'status'
              ? { borderBottom: '2px solid royalblue' }
              : {}
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
          style={
            props.params.sort_direction === 'asc'
              ? { borderBottom: '2px solid royalblue' }
              : {}
          }
        >
          ASC
        </button>
        <button
          name="desc"
          onClick={setSort}
          style={
            props.params.sort_direction === 'desc'
              ? { borderBottom: '2px solid royalblue' }
              : {}
          }
          className="button"
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
