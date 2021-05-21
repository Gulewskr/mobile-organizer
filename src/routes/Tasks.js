import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../data/DataContext';
import {getAllTask} from '../data/database';

import {NavbarBack} from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';
import SortTaskMenu from '../components/sortingTask';

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

  //gdy ekran jest aktywny wczytywane są wartości
  const isFocused = useIsFocused();
   useEffect(() => {
    if(isFocused){     
     setTaskID('');
    }
   }, [isFocused])

  var value = null;
  
  try{
    value = tasks.map((data, index) => {
      return(
      <Task key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
      day={data._day} month={data._month} year={data._year} ended={data.ended} spec={data.spec} progress={data.endedP}
      showOptions={ () => { setAddMenu(false); setOVisibility(true) }} setId={()=>{setTaskid(data.id); setTask(data);}}/>
    );});
  }catch(err){
    console.log(err);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} />
      { removeMenu ?
      null
      :
      <>
      <ScrollView style={{zIndex: 1, width: "100%"}}>
      {/* Wypisywanie listy zadań: */}
      {value}
      <View style={{marginBottom: 200}}/>
      {/* Koniec listy zadań */}
      </ScrollView>
      { 
      oVisibility ?
      <View style={styles2.optionContainer}>
        <TaskOptions id={taskID} task={task} close={()=>setOVisibility(false)} navigation={()=>{ navigation.push('Task', {'id': taskID, 'name': task.name})}} />
      </View>
      :
      null
      }
      {addMenu ?
      <AddTaskMenu close={() => setAddMenu(false)} id={''}/>
      :
      null
      }
      {sortMenu ?
      <SortTaskMenu close={() => setSortMenu(false)} />
      :
      null
      }
      <TouchableOpacity style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setOVisibility(false); setSortMenu(false); setAddMenu(true)}}>
        <Image source={icons.plus} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]}  onPress={()=> {setOVisibility(false); setAddMenu(false); setSortMenu(true)}}>
        <Image source={icons.sort} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]}  onPress={()=> {setOVisibility(false); setAddMenu(true)}} >
        <Image source={icons.trash} style={styles2.buttonIcon} />
      </TouchableOpacity>
      </>
      }
    </View>
  );   
};