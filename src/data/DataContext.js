import React, {createContext, useMemo, useState, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import events from './events.json';
import notes from './notes.json';
import tasks from './tasks.json';

export const DataContext = React.createContext();

export function DataContextProvider({ children }){
    const [tasksItems, setTasksItems] = useState(tasks);
    const [notesItems, setNotesItems] = useState(notes);
    const [eventsItems, setEventsItems] = useState(events);
  
    const refreshTaskItem = (index, newData) => { 
        let itemsCopy = [... tasksItems];
        itemsCopy.splice(index, 1, newData);
        setTasksItems(itemsCopy);
    };

    //TODO
    const addItemTask = (ids, name, deadline, day, month, year) => {
      let itemsCopy = [... tasksItems];

      const insertTask = (data, ids, name, deadline, day, month, year, id) => {
        if(ids != null && ids != undefined && id < ids.length - 1)
        {
          data[ids[id]].more = insertTask(data[ids[id]].more, ids, name, deadline, day, month, year, id + 1);
        }else{
          data.more.push(createTask(name, deadline, day, month, year));
        }
        return data;
      }

      const createTask = (name, deadline, day, month, year) => {
        let item = {'name' : name, 
                    "deadline" : deadline,
                    "data" : {
                      "day" : day,
                      "month" : month + 1,
                      "year" : year},
                    "specified" : false,
                    "more" : "",
                    "ended" : false
                    }
        return item;
      }

      if(ids == null || ids == undefined || ids.length == 0)
      {
        itemsCopy.push(createTask(name, deadline, day, month, year));
      }else{
        insertTask(itemsCopy, ids, name, deadline, day, month, year, 0);
      }
      setTasksItems(itemsCopy);
    }

    const getItemsTasks = (ids) => {
      let itemsCopy = [... tasksItems];
      let data = null;
      if(ids != null && ids != undefined && ids.length > 0)
      {
        data = itemsCopy[ids[0]];
      }else{
        return itemsCopy;
      }
      
      for(let i = 1; i < ids.length; i++)
      {
        data = data.more[ids[i]];
      }
      
      return data;
    }

    //usunięcie zadania z listy
    const removeTaskItem = (ids) => {
      
      var removeMore = (data, ids, id) => {
        if(ids != null && ids != undefined && id < ids.length - 1)
        {
          data[ids[id]].more = removeMore(data[ids[id]].more, ids, id + 1);
        }else{
          data.splice(ids[id], 1);
        }
        return data;
      }

      let itemsCopy = [... tasksItems];
      removeMore(itemsCopy, ids, 0);
      setTasksItems(itemsCopy);
    }

    //zmiana nazwy zadania
    const changeName = (ids, newName) => {

      var setNewName = (data, newName, ids, id) => {
        if(ids != null && ids != undefined && id < ids.length - 1)
        {
          data[ids[id]].more = setNewName(data[ids[id]].more, newName, ids, id + 1);
        }else{
          data[ids[id]].name = newName;
        }
        return data;
      }

      let itemsCopy = [... tasksItems];
      setNewName(itemsCopy, newName, ids, 0);
      setTasksItems(itemsCopy);
    }

    //zmiana daty deadline'u
    const changeDate = (ids, day, month, year) => {

      var setNewDate = (data, ids, day, month, year, id) => {
        if(ids != null && ids != undefined && id < ids.length - 1)
        {
          data[ids[id]].more = setNewDate(data[ids[id]].more, ids, day, month, year, id + 1);
        }else{
          data[ids[id]].deadline = true;
          data[ids[id]].data.day = day;
          data[ids[id]].data.month = month;
          data[ids[id]].data.year = year;
        }
        return data;
      }

      let itemsCopy = [... tasksItems];
      setNewDate(itemsCopy, ids, day, month, year, 0);
      setTasksItems(itemsCopy);
    }

    const refreshTasks = () => {
      setTasksItems(tasksItems);
    }

    //zmiana stanu zakończenia zadania
    const changeTaskProgress = (ids) => {
      
      var changeProgress = (data, ids, id) => {
        if(ids != null && ids != undefined && id < ids.length - 1)
        {
          data[ids[id]].more = changeProgress(data[ids[id]].more, ids, id + 1);
        }else{
          data[ids[id]].ended = !data[ids[id]].ended;
        }
        return data;
      }

      let itemsCopy = [... tasksItems];
      changeProgress(itemsCopy, ids, 0);
      setTasksItems(itemsCopy);
    }

    const save = async() => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasksItems));
        await AsyncStorage.setItem("notes", JSON.stringify(notesItems));
        await AsyncStorage.setItem("events", JSON.stringify(eventsItems));
      } catch (err) {
        alert(err);
      }
    }

    const load = async() => {
      try {
        let tasks = await AsyncStorage.getItem("tasks");
        let notes = await AsyncStorage.getItem("notes");
        let events = await AsyncStorage.getItem("events");

        if (tasks != null){
          setTasksItems(JSON.parse(task));
        }

        if (notes != null){
          setNotesItems(JSON.parse(notes));
        }

        if ( events != null){
          setEventsItems(JSON.parse(events));
        }

      } catch (err) {
        alert(err);
      }
    }
    const value = useMemo(
      () => ({
        tasksItems, setTasksItems, notesItems, setNotesItems, eventsItems, 
        setEventsItems, refreshTaskItem, refreshTasks, save, load,
        changeName, removeTaskItem, changeDate, changeTaskProgress, 
        getItemsTasks, addItemTask
      }),
      [tasksItems, setTasksItems, notesItems, setNotesItems, eventsItems, 
        setEventsItems, refreshTaskItem, refreshTasks, save, load,
        changeName, removeTaskItem, changeDate, changeTaskProgress, 
        getItemsTasks, addItemTask
      ],
    );

    return (
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
    );
};


function useData(){
  const {tasksItems, refreshItem} = useContext(DataContext);
  return [ tasksItems, refreshItem ];
};

export {useData}
export default DataContext;