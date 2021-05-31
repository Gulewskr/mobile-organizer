import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../data/DataContext';

import {NavbarBack} from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';
import SortTaskMenu from '../components/sortingTask';
import DeleteMenu from '../components/deleteMenu';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import { useIsFocused } from "@react-navigation/native";

export default Tasks = ({navigation}) => {
  const { themeID } = useTheme();
  
  const [oVisibility, setOVisibility] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);
  const [taskID, setTaskid] = useState(0);
  const [task, setTask] = useState(null);

  const { tasks, setTaskID } = useContext(DataContext);

  const setActiveMenu = (activeID) => {
    setOVisibility(activeID == 0);
    setAddMenu(activeID == 1);
    setSortMenu(activeID == 2);
    setRemoveMenu(activeID == 3);
  }

  //gdy ekran jest aktywny wczytywane są wartości
  const isFocused = useIsFocused();
  
   useEffect(() => {
    if(isFocused){     
     setTaskID(0);
    }
   }, [isFocused])

  var value = null;
  
  if(removeMenu == false && tasks != undefined)
  try{
      value = tasks.map((data, index) => {
        return(
          <Task key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
            day={data._day} month={data._month} year={data._year} ended={data.ended} spec={data.spec} progress={data.endedP}
            press={() => { setActiveMenu(0); setTaskid(data.id); setTask(data);}}/>
        );
      });
  }catch(err){
    console.log(err);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} />
      {/* Wypisywanie listy zadań: */}
      {removeMenu ?
      <DeleteMenu id={0} close={() => {setRemoveMenu(false)}}/>
      : 
      <ScrollView style={{zIndex: 1, width: "100%"}}>
        <View style={{height: 10}}/>
        {value} 
        <View style={{marginBottom: 200}}/>
      </ScrollView>
      }
      {/* Koniec listy zadań */}
      { removeMenu ||
      <>
      { 
        oVisibility ?
        <>
          <TaskOptions id={taskID} task={task} close={()=>setOVisibility(false)} navigation={()=>{ navigation.push('Task', {'id': taskID, 'name': task.name})}} />
          <TouchableOpacity style={styles.fillRect} onPress={() => setOVisibility(false)}/>
        </>
        :
        null
        }
        {addMenu ?
        <AddTaskMenu id={0} eID={0} close={() => setAddMenu(false)}/>
        :
        null
        }
        {sortMenu ?
        <SortTaskMenu id={0} close={() => setSortMenu(false)} />
        :
        null
        }
        <TouchableOpacity activeOpacity={1} style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(1);}}>
          <Image source={icons.plus} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(2);}}>
          <Image source={icons.sort} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(3)}} >
          <Image source={icons.trash} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </>
      }
    </View>
  );   
};