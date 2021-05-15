import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../data/DataContext';

import {NavbarBack} from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

export default Tasks = ({navigation}) => {
  const { themeID } = useTheme();
  
  const [oVisibility, setOVisibility] = useState(false);
  const [taskID, setTaskID] = useState(0);

  const { tasksItems } = useContext(DataContext);

  var value = null;
  
  try{
    value = tasksItems.map((data, index) => {
      return(
      <Task key={index} index={index} specified={data.specified} nazwa={data.name} deadline={data.deadline} 
      day={data.data.day} month={data.data.month} year={data.data.year} more={data.more} 
      ended={data.ended} setV={setOVisibility} setT={setTaskID}/>
    );});
  }catch(err){
    console.log(err);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} />
      <ScrollView style={{zIndex: 1, width: "100%"}}>
      {/* Wypisywanie listy zadań: */}
      {value}
      {/* Koniec listy zadań */}
      </ScrollView>
      { 
      oVisibility ?
      <TouchableOpacity style={styles.fillRect} onPress={()=>setOVisibility(false)}>
        <View style={styles2.optionContainer}>
          <TaskOptions key={taskID} ids={[taskID]} show={setOVisibility} navigation={navigation} />
        </View>
      </TouchableOpacity>
      :
      null
      }
    </View>
  );   
};