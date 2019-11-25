import React, { Fragment } from 'react';

import SortButtons from './SortButtons/SortButtons';
import UserInfo from './UserInfo/UserInfo';
import NewTaskForm from './NewTaskForm/NewTaskForm';
import NotificationsList from './Notifications/NotificationsList';
import TaskList from './Task/TaskList';
import PageList from './PageList/PageList';

import './TasksPage.css';

const TasksPage = () => (
  <Fragment>
    <header>
      <SortButtons />
      <UserInfo />
    </header>
    <NotificationsList />
    <NewTaskForm />
    <TaskList />
    <PageList />
  </Fragment>
);

export default TasksPage;
