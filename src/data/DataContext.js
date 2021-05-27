
import React, { useEffect, createContext, useState, useLayoutEffect } from 'react';
import {database} from './database'

export const DataContext = createContext({});

const IDNavTask = [];

export const DataContextProvider = ({children}) => {

  const [ tasks, setTasks ] = useState(null);
  const [ task, setTask ] = useState(null);

  const [ taskID, setTaskId ] = useState(0);

  const [ catalogs, setCatalogs ] = useState(null);
  const [ tags, setTags ] = useState(null);

  useEffect(() => {
    refreshTasks();
    refreshNotes()
  }, [] )

  const addNewTask = ( name, deadline, day, month, year, connectedid ) => {
    return database.addTask( name, deadline, day, month, year, connectedid, refreshTasks)
  };

  const addNoteFromPanel = (name, catalogName, tagList, connectedTask, connectedEvent) => {
    return database.addNoteFromPanel(name, catalogName, tagList, connectedTask, connectedEvent, refreshNotes);
  };

  const addCatalog = (name) => {
    database.addCatalog(name, refreshNotes);
  };

  const addTag = async(name) => {
    try{
      await database.addTag(name);
    } catch (e) {
      console.warn(e);
    }
  };

  const refreshTasks = async() =>  {
    //database.getTasks( setTasks );
    await database.getTask( taskID, setTask);
    await database.getMoreTask(taskID, setTasks);
  }

  const refreshNotes = () =>  {
    //database.getTasks( setTasks );
    database.getCatalogs( setCatalogs );
  }


  const changeName = (taskID, name) => {
    return database.changeName(taskID, name, refreshTasks);
  }

  const changeNoteName = (id, name) => {
    return database.changeNoteName(id, name);
  }

  const changeDeadline= (taskID, bool, day, month, year) => {
    return database.changeDeadline(taskID, bool ? 1 : 0 , day, month, year, refreshTasks);
  }

  const changeStatus = (taskID, bool, parentID) => {
    return database.changeStatus(taskID, bool ? 1 : 0, refreshTasks, parentID);
  }

  const deleteTask = (taskID) => {
    return database.deleteTask(taskID, refreshTasks);
  }

  const getMoreTask = (id) => {
    database.getMoreTask(id, setTasks);
  }

  const getTagsByID = async (id) => {
    try{
      let result = await database.getTagsByID(id);
      return result;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const getNote = async (id) => 
  {
    try{
      let result = await database.getNote(id);
      if(result.length > 0){
        return result[0];
      }else{
        return null
      }
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const getNotesFromCatalog = async (id) => 
  {
    try{
      let result = await database.getNotesFromCatalog(id);
      return result;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const sortTask = (id, opt1, opt2, opt3) => {
    return database.sortTask(id, opt1, opt2, opt3, setTasks);
  }

  const setTaskID = (id) => {
    setTaskId(id);
    database.getTask( id, setTask);
    database.getMoreTask(id, setTasks);
  }

  

  // Make the context object:
  const dataContext = {
    tasks,
    task,
    catalogs,
    tags,
    addNewTask,
    addTag,
    addNoteFromPanel,
    addCatalog,
    changeName,
    changeDeadline,
    changeNoteName,
    changeStatus,
    deleteTask,
    getMoreTask,
    getNote,
    getNotesFromCatalog,
    getTagsByID,
    setTaskID,
    sortTask
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};