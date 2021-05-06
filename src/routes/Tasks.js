import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../DataContext';

import {NavbarBack} from '../components/navbar';
import Task from '../components/task';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../styles/colors';
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
    alert(err);
  }
  
  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} />
      <ScrollView style={{zIndex: 1, width: "100%"}}>
      {/* Wypisywanie listy zadań: */}
      {value}
      {/* Koniec listy zadań */}
      </ScrollView>
      <View style={styles2.optionContainer}>
        <Options key={taskID}  index={taskID} v={oVisibility} setV={setOVisibility} />
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
  const { tasksItems, changeName, save, changeTaskLevel1, removeTaskItem} = useContext(DataContext);
  const { themeID } = useTheme();
  
  try{
    //Blokada przed indeksowaniem poza tablicą
  if(tasksItems[props.index] === undefined) return null;
  //Zmiana nazwy
  const [ taskName, onChangeName ] = useState( tasksItems[props.index].name );
  const [ editName,  allowEditName ] = useState(false);
  const setNemName = (changeOrReset) => {
    if(changeOrReset){
      changeName(props.index, taskName);
    }
    else onChangeName(tasksItems[props.index].name);
  }

  const close = () => {
    allowEditName(false);
    setNemName(false);
    props.setV(false);
  }


  if(props.v)
    return (
    <View style={[styles2.optionContainerInside, {backgroundColor: themeID.colorContainer}]}>
      <View style={styles2.optionsTextInputContainer}>
        <TextInput multiline={true} editable={editName} style={[styles2.optionsText, styles2.optionsTextInput, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={onChangeName} value={ taskName } />
        { editName ? 
        <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => { allowEditName(false); setNemName(true) }}>
          <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.save} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { allowEditName(false); setNemName(false) }}>
          <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.cross} />
        </TouchableOpacity>
        </View>
        :
        <TouchableOpacity onPress={() => { allowEditName(true) }}>
          <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
        </TouchableOpacity>
        }
      </View>
      <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => close()}>
        <Image style={styles.exitButtonIcon} source={icons.cross} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => save()}>
        <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Edytuj deadline</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => props.setV(false)}>
        <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => {changeTaskLevel1(props.index); close()}}>
        <Text style={{fontSize: 16, color: "#129403", alignSelf: "center"}}>{ tasksItems[props.index].ended ? "Kontynuuj zadanie" : "Zakończ zadanie" }</Text>
      </TouchableOpacity>
      {
      /*
      Problemy z indeksowaniem jak się zacznie usuwać
      */
      }
      <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => {close(); removeTaskItem(props.index)}}>
        <Text style={{fontSize: 16, color: "#FC0E0E", alignSelf: "center"}}>Usuń zadanie</Text>
      </TouchableOpacity>
    </View>
    );
  }catch (err){
    console.log(err);
  }
  return null;
};