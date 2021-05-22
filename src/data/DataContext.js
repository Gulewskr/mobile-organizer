
import React, { useEffect, createContext, useState } from 'react';
import {database} from './database'

export const DataContext = createContext({});

const IDNavTask = [];

export const DataContextProvider = ({children}) => {

  const [ tasks, setTasks ] = useState(null);
  const [ task, setTask ] = useState(null);

  const [ taskID, setTaskId ] = useState(0);

  useEffect(() => {
    refreshTasks()
  }, [] )

  const addNewTask = ( name, deadline, day, month, year, connectedid ) => {
    return database.addTask( name, deadline, day, month, year, connectedid, refreshTasks)
  };

  const refreshTasks = () =>  {
    //database.getTasks( setTasks );
    database.getTask( taskID, setTask);
    database.getMoreTask(taskID, setTasks);
  }

  const changeName = (taskID, name) => {
    return database.changeName(taskID, name, refreshTasks)
  }

  const changeDeadline= (taskID, bool, day, month, year) => {
    return database.changeDeadline(taskID, bool ? 1 : 0 , day, month, year, refreshTasks)
  }

  const changeStatus = (taskID, bool, parentID) => {
    return database.changeStatus(taskID, bool ? 1 : 0, refreshTasks, parentID)
  }

  const getMoreTask = (id) => {
    return database.getMoreTask(id, setTasks);
  }

  const sortTask = (id, opt1, opt2, opt3) => {
    return database.sortTask(id, opt1, opt2, opt3, setTasks);
  }

  const setTaskID = async (id) => {
    setTaskId(id);
    database.getTask( id, setTask);
    database.getMoreTask(id, setTasks);
  }

  // Make the context object:
  const dataContext = {
    tasks,
    task,
    addNewTask,
    setTaskID,
    sortTask,
    changeName,
    changeDeadline,
    changeStatus,
    getMoreTask
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};