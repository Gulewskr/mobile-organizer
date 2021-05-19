import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../data/DataContext';

import {NavbarBack} from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

export default Tasks = ({navigation}) => {
  const { themeID } = useTheme();
  
  const [oVisibility, setOVisibility] = useState(false);
  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);
  const [taskID, setTaskID] = useState(0);

  const { tasksItems } = useContext(DataContext);

  var value = null;
  
  try{
    value = tasksItems.map((data, index) => {
      return(
      <Task key={index} index={index} nazwa={data.name} deadline={data.deadline} 
      day={data.data.day} month={data.data.month} year={data.data.year} more={data.more} 
      ended={data.ended} setV={setOVisibility} setT={setTaskID}/>
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
      <TouchableOpacity style={styles.fillRect} onPress={()=>setOVisibility(false)}>
        <View style={styles2.optionContainer}>
          <TaskOptions key={taskID} ids={[taskID]} close={()=>setOVisibility(false)} navigation={navigation} />
        </View>
      </TouchableOpacity>
      :
      null
      }
      {addMenu ?
      <AddTaskMenu addTask={tasksItems} close={() => setAddMenu(false)} ids={null}/>
      :
      null
      }
      {sortMenu ?
      null
      :
      null
      }
      <TouchableOpacity style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> setAddMenu(true)}>
        <Image source={icons.plus} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]}>
        <Image source={icons.sort} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]}>
        <Image source={icons.trash} style={styles2.buttonIcon} />
      </TouchableOpacity>
      </>
      }
    </View>
  );   
};