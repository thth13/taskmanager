import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks } from '../../../actions/tasks';
import { setFilters } from '../../../actions/params';

import TaskLoading from './TaskLoading';
import TaskItem from './TaskItem';

import './Task.css';

class TaskList extends Component {
  componentDidMount = () => {
    this.props.loadTasks(this.props.params);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.params !== this.props.params) {
      this.props.loadTasks(this.props.params)
      this.props.setFilters();
    }
  };

  render() {
    const { tasks, notification } = this.props;

    return (
      <div>
        {notification !== '' && (
          <div className="notification">{notification}</div>
        )}
        {tasks.length === 0 ? (
          <TaskLoading />
        ) : (
          tasks.map(item => (
            <TaskItem key={item.id} task={item} />
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  params: state.params,
  notification: state.notification,
});

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  params: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired,
  loadTasks: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { loadTasks, setFilters }
)(TaskList);
