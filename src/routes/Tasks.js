import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import {NavbarBack} from '../components/navbar';
import {Task} from '../components/task';
import tasks from '../data/tasks.json'

import styles from '../styles/styles';
import { useTheme } from '../styles/colors';

function getTasks(){
  var value = [];
  for(let i = 0; i < tasks.length; i++)
  {
    let data = "";
    if(tasks[i].deadline)
    {
      data = tasks[i].data.day + " " + tasks[i].data.month + " " + tasks[i].data.year;
    }
    value.push(<Task nazwa={tasks[i].name} deadline={data} />);
  }
  return value;
}

export default Tasks = ({navigation, theme}) => {
  const { themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Zadania'} navigate={navigation} theme={theme} />
        <ScrollView style = {{marginTop: 10}}>
        {getTasks()}
        </ScrollView>
      </View>
    );
};