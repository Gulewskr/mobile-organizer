import React, {createContext, useMemo, useState, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import events from './data/events.json';
import notes from './data/notes.json';
import tasks from './data/tasks.json';

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

    const removeTaskItem = (index) => { 
      let itemsCopy = [... tasksItems];
      itemsCopy.splice(index, 1);
      setTasksItems(itemsCopy);
    };

    const changeName = (index, newName) => {
      let itemsCopy = [... tasksItems];
        itemsCopy[index].name =  newName;
        setTasksItems(itemsCopy);
    }

    const refreshTasks = () => {
      setTasksItems(tasksItems);
    }

    const changeTaskLevel1 = (index) => {
      let itemsCopy = [... tasksItems];
      itemsCopy[index].ended = !itemsCopy[index].ended;
      setTasksItems(itemsCopy);
    }

    const changeTaskLevel2 = (index1, index2) => {
      let itemsCopy = [... tasksItems];
      itemsCopy[index1].more[index2].ended = !itemsCopy[index1].more[index2].ended;
      setTasksItems(itemsCopy);
    }

    const changeTaskLevel3 = (index1, index2, index3) => {
      let itemsCopy = [... tasksItems];
      itemsCopy[index1].more[index2].more[index3].ended = !itemsCopy[index1].more[index2].more[index3].ended;
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
        changeTaskLevel1, changeTaskLevel2, changeTaskLevel3, changeName,
        removeTaskItem
      }),
      [tasksItems, setTasksItems, notesItems, setNotesItems, eventsItems, 
        setEventsItems, refreshTaskItem, refreshTasks, save, load,
        changeTaskLevel1, changeTaskLevel2, changeTaskLevel3, changeName,
        removeTaskItem
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