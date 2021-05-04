import React, {useState} from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import {NavbarBack} from '../components/navbar';
import Task from '../components/task';
import tasks from '../data/tasks.json';

import styles from '../styles/styles';
import { useTheme } from '../styles/colors';

export default Tasks = ({navigation, theme}) => {
  const { themeID } = useTheme();
  const [tasksItems, setTaskItems] = useState(tasks);
  const [oVisibility, setOVisibility] = useState(false);
  const [task, setTask] = useState(0);

  const refreshItems = (index, newData) => { 
    let itemsCopy = [... tasksItems];
    itemsCopy.splice(index, 1, newData);
    setTaskItems(itemsCopy);
  }
  //setTaskItems(getTasks());
  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} theme={theme} />
      <Options index={task} data={tasksItems[task]} v={oVisibility} setV={setOVisibility} refresh={refreshItems}/>
      <ScrollView style={{width: "100%"}}>
      {/* Wypisywanie listy zadań: */}
      {
       tasksItems.map((data, index) => {
        return(
        <Task key={index} index={index} specified={data.specified} nazwa={data.name} deadline={data.deadline} 
        day={data.data.day} month={data.data.month} year={data.data.year} more={data.more} 
        ended={data.ended} setV={setOVisibility} setT={setTask}/>
       );})
      }
      {/* Koniec listy zadań */}
      </ScrollView>
    </View>
  );
};

const Options = (props) => {
  if(props.v)
    return (
    <View>
      <TouchableOpacity onPress={() => props.setV(false)}>
        <Text>Tu będą opcje danego koxa ez</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { props.data.name = "XD"; props.refresh(props.index, props.data)}}>
        <Text>{props.data.name}</Text>
      </TouchableOpacity>
    </View>
    );
  return null;
};