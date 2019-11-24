import React, { Fragment } from 'react';

import SortButtons from './SortButtons/SortButtons';
import UserInfo from './UserInfo/UserInfo';
import NewTaskForm from './NewTaskForm/NewTaskForm';
import Notifications from './Notifications/Notifications';
import TaskList from './Task/TaskList';
import PageList from './PageList/PageList';

import './TasksPage.css';

const TasksPage = () => (
  <Fragment>
    <header>
      <SortButtons />
      <UserInfo />
    </header>
    <Notifications />
    <NewTaskForm />
    <TaskList />
    <PageList />
  </Fragment>
);

export default TasksPage;
