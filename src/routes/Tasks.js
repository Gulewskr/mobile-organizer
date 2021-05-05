import React, {useState} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';

import {NavbarBack} from '../components/navbar';
import Task from '../components/task';
import tasks from '../data/tasks.json';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../styles/colors';
import { icons } from '../components/icons';

export default Tasks = ({navigation, theme}) => {
  const { themeID } = useTheme();
  
  const [oVisibility, setOVisibility] = useState(false);
  
  const [tasksItems, setTaskItems] = useState(tasks);
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
      <ScrollView style={{zIndex: 1, width: "100%"}}>
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
      <View style={styles2.optionContainer}>
        <Options index={task} data={tasksItems[task]} v={oVisibility} setV={setOVisibility} refresh={refreshItems}/>
      </View>
    </View>
  );
};

const Options = (props) => {
  /*  Dodać:
  -potwierdzenie usunięcia
  -zmiana deadlineu
  -przejscie na podstrone zadania
  props(zadanie, podzadania, zmiana listy zadan)
  -potwierdzenie zakończenia
  */
  const { themeID } = useTheme();
  if(props.v)
    return (
    <View style={[styles2.optionContainerInside, {backgroundColor: themeID.colorContainer}]}>
      <View style={{marginBottom: 15, flexDirection: "row", justifyContent: "center"}}>
        <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>{props.data.name}</Text>
        <TouchableOpacity onPress={() => { props.data.name = "XD"; props.refresh(props.index, props.data)}}>
          <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Image style={styles.exitButtonIcon} source={icons.cross} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Edytuj deadline</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Text style={{fontSize: 16, color: "#129403", alignSelf: "center"}}>Zakończ zadanie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Text style={{fontSize: 16, color: "#FC0E0E", alignSelf: "center"}}>Usuń zadanie</Text>
      </TouchableOpacity>
    </View>
    );
  return null;
};