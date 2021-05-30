
import React, { useEffect, createContext, useState, useLayoutEffect } from 'react';
import {database} from './database'

export const DataContext = createContext({});

const IDNavTask = [];

export const DataContextProvider = ({children}) => {

  const [ tasks, setTasks ] = useState(null);
  const [ task, setTask ] = useState(null);

  const [events, setEvents] = useState(null);

  const [ taskID, setTaskId ] = useState(0);

  const [ catalogs, setCatalogs ] = useState(null);
  const [ tags, setTags ] = useState(null);

  useEffect(() => {
    refreshTasks();
    refreshEvents();
    //refreshNotes()
  }, [] )

  const addNewTask = ( name, deadline, day, month, year, connectedid ) => {
    return database.addTask( name, deadline, day, month, year, connectedid, refreshTasks)
  };

  const addNoteFromPanel = (name, catalogName, tagList, connectedTask, connectedEvent) => {
    return database.addNoteFromPanel(name, catalogName, tagList, connectedTask, connectedEvent);
  };

  const addCatalog = (name) => {
    database.addCatalog(name);
  };

  const addTag = async(name) => {
    try{
      await database.addTag(name);
    } catch (e) {
      console.warn(e);
    }
  };

  //usuwanie katalogu
  const deleteCatalog = async(id) => {
    try{
      await database.deleteNoteFromCatalog(id);
      await database.deleteCatalog(id);
    } catch (e) {
      console.warn(e);
    }
  }

  const deleteTagConnection = (id, tag) => {
    return database.deleteTagConnection(id, tag);  
  }

  const changeNoteCatalog = async(idNote, idCatalog) => {
    try{
      await database.changeNoteCatalog(idNote, idCatalog);
    } catch (e) {
      console.warn(e);
    }
  }

  //usuwanie notatki
  const deleteNote = async(ID) => {
    try{
      await database.deleteNote(ID);
    } catch (e) {
      console.warn(e);
    }
  }

  const deleteEvent = async(ID) => {
    try{
      await database.deleteEvent(ID);
      refreshEvents();
    } catch (e) {
      console.warn(e);
    }
  }

  const addEvent = async(name, type, _year, _month, _day, dayWeek, hour, minute, icon) => {
    try{
      await database.addEvent(name, type, _year, _month, _day, dayWeek, hour, minute, icon, refreshEvents);
    } catch (e) {
      console.warn(e);
    }
  }

  const addTagToNote = async(noteID, tag) => {
    try{
      await database.addTag(tag);
      database.makeConnectionsToTag(noteID, tag);
    } catch (e) {
      console.warn(e);
    }
  }
  
  const refreshTasks = async() =>  {
    await database.getTask( taskID, setTask);
    await database.getMoreTask(taskID, setTasks);
  }

  const refreshEvents = async() =>  {
    await database.getEvents(setEvents);
  }

  const updateNote = (noteID, text) => {
    database.setNote(noteID, text);
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

  const delteTag = async(tag) => {
    try{
      database.deleteTagConnections(tag);
      database.deleteTag(tag);
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const getCatalogs = async() => {
    try{
      let result = await database.getCatalogs();
      return result;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }

  const getMoreTask = (id) => {
    database.getMoreTask(id, setTasks);
  }

  const getTags = async () => {
    try{
      let result = await database.getTags();
      return result;
    } catch (e) {
      console.warn(e);
      return null;
    }
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

  const getEvents = async () => {
    try{
      let result = await database.getEvents();
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

  const getNotesFromCatalog = async (id, filter) => 
  {
    try{
      let result = await database.getNotesFromCatalog(id, filter);
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
    tags,
    events,
    addEvent,
    addNewTask,
    addTag,
    addTagToNote,
    addNoteFromPanel,
    addCatalog,
    changeName,
    changeDeadline,
    changeNoteName,
    changeStatus,
    changeNoteCatalog,
    deleteCatalog,
    deleteEvent,
    deleteNote,
    deleteTask,
    delteTag,
    deleteTagConnection,
    getCatalogs,
    getEvents,
    getMoreTask,
    getNote,
    getNotesFromCatalog,
    getTags,
    getTagsByID,
    setTaskID,
    sortTask,
    updateNote
  };

  // pass the value in provider and return
  return <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>;
};