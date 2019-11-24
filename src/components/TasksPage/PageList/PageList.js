import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPage } from '../../../actions/params';

import './PageList.css';

const PageList = props => {
  const setPage = e => {
    const { id, name } = e.target;

    if (name === 'increment') {
      props.setPage(props.page + 1);
    } else if (name === 'decrement') {
      props.setPage(props.page - 1);
    } else {
      props.setPage(parseInt(id));
    }
  };

  const addButton = (i) => {
    const { page } = props;

    return (
      <button
          className="pageListButton"
          style={page === i ? { borderBottom: '2px solid royalblue' } : {}}
          id={i}
          key={i}
          onClick={setPage}
        >
          {i}
        </button>
      )
  }

  const pageNavigation = () => {
    const { pages, page } = props;
    let buttons = [];

    // Добавляем кнопку страницы 1
    if (pages > 1 || pages > 7) {
      buttons.push(addButton(1))
    }

    // Добавляем остальные кнопки
    if (pages < page +7 && pages > 7) {
      for (let i = pages -7; i < pages; i++) {
        buttons.push(addButton(i))
      }
    } else if (pages < 7 && page < 7) {
      for (let i = 1; i < pages +1; i++) {
        if (i <= 1) continue;
        buttons.push(addButton(i))
      }
    } else if (pages > 1 || pages >= page +7) {
      for (let i = page -1; i < pages +1; i++) {
        if (i > page + 6) break;
        if (i <= 1) continue;
        buttons.push(addButton(i))
      }
    }

    // Добавляем кнопку последней страницы
    if (pages > 7) {
      buttons.push(addButton(pages))
    }

    return buttons;
  };

  return (
    <div className="pageList">
      <button
        style={props.page > 1 ? {} : { visibility: 'hidden' }}
        className="pageListButton"
        name="decrement"
        onClick={setPage}
      >
        {'<'}
      </button>
      {pageNavigation()}
      <button
        style={props.page < props.pages ? {} : { visibility: 'hidden' }}
        className="pageListButton"
        name="increment"
        onClick={setPage}
      >
        {'>'}
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  pages: state.tasks.pages,
  page: state.params.page,
});

PageList.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { setPage }
)(PageList);
