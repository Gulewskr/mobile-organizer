import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import {DataContext} from '../data/DataContext';

import {NavbarBack} from '../components/navbar';
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
  
  const Options = (props) => {
    /*  Dodać:
    -zmiana deadlineu
    */
    const { tasksItems, changeName, save, changeTaskLevel1, removeTaskItem} = useContext(DataContext);
    const { themeID } = useTheme();
    
    try{
    if(tasksItems[taskID] === undefined) return null;
    
    // Zmiana nazwy
    const [ taskName, onChangeName ] = useState( tasksItems[taskID].name );
    const [ editName,  allowEditName ] = useState(false);
    const setNemName = (changeOrReset) => {
      if(changeOrReset){
        changeName([taskID], taskName);
      }
      else onChangeName(tasksItems[taskID].name);
    };
  
    const close = () => {
      allowEditName(false);
      setNemName(false);
      setOVisibility(false);
    };

    // Przycisk zakończ/kontynuuj zadanie
    const ChangeEndingState = () => { 
      const [v, setV] = useState(false);
      const ConfirmButton = () => {
        const confirm = (bool) => {
            if(bool){
              changeTaskLevel1(taskID);
            }
            setV(false);
      };

        if(v){
            return (
              <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
              <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
                <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>{tasksItems[taskID].ended ? "Czy chcesz kontynuować zadanie?" : "Czy chcesz zakończyć zadanie?"}</Text>
               <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                  <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                   <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
                  </TouchableOpacity>
                <View style={{width: "15%"}}></View>
                  <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                    <Text style={[styles.ConfirmButtonText, { color: "#FE1010"}]} >Nie</Text>
                  </TouchableOpacity>
               </View>
              </View>
              </TouchableOpacity>
            );
        }else{
            return null
        }
      };

      return (
        <>
        <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => setV(true)}>
          <Text style={{fontSize: 16, color: "#129403", alignSelf: "center"}}>{ tasksItems[taskID].ended ? "Kontynuuj zadanie" : "Zakończ zadanie" }</Text>
        </TouchableOpacity>
        <ConfirmButton />
        </>
      );
    };

    // Przycisk usunięcia zadania
    const RemoveTask = () => { 
      const [v, setV] = useState(false);
      const ConfirmButton = () => {
        const confirm = (bool) => {
            if(bool){
              removeTaskItem(taskID);
            }
            setV(false);
      };

        if(v){
            return (
              <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
              <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
                <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>Czy chcesz usunąć zadanie?</Text>
               <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                  <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                   <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
                  </TouchableOpacity>
                <View style={{width: "15%"}}></View>
                  <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                    <Text style={[styles.ConfirmButtonText, {color: "#FE1010"}]} >Nie</Text>
                  </TouchableOpacity>
               </View>
              </View>
              </TouchableOpacity>
            );
        }else{
            return null
        }
      };

      return (
        <>
          <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => setV(true)}>
            <Text style={{fontSize: 16, color: "#FC0E0E", alignSelf: "center"}}>Usuń zadanie</Text>
          </TouchableOpacity>
          <ConfirmButton />
        </>
      );
    };

    return (
      <View style={[styles2.optionContainerInside, {backgroundColor: themeID.colorContainer}]}>
        {/* Zmiana nazwy */}
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
        {/* Przycisk exit */}
        <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => close()}>
          <Image style={styles.exitButtonIcon} source={icons.cross} />
        </TouchableOpacity>
        {/* Edycja deadline */}
        <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => save()}>
          <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Edytuj deadline</Text>
        </TouchableOpacity>
        {/* Przejście do szczegółów */}
        <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => navigation.navigate('Task', {'task': tasksItems[taskID], 'index': [taskID]})}>
          <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
        </TouchableOpacity>
        {/* Przycisk zakończ/kontynuuj zadanie */}
        <ChangeEndingState />
        {/* Przycik usuń zadanie */}
        <RemoveTask />
      </View>
    );
    }catch (err){
      console.log(err);
    }
    return null;
  };

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
          <Options key={taskID} />
        </View>
      </TouchableOpacity>
      :
      null
      }
    </View>
  );   
};