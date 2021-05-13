import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { Route } from '@react-navigation/native';

import {DataContext} from '../data/DataContext';

import {NavbarBack} from '../components/navbar';
import Task from '../components/task';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

export default TaskSpec = ({navigation, route}) => {
  const { changeName } = useContext(DataContext);
  const { themeID } = useTheme();
  const [oVisibility, setOVisibility] = useState(false);
  const [taskID, setTaskID] = useState(0);
  const ids = route.params.index;
  // Zmiana nazwy
  const [ taskName, onChangeName ] = useState( route.params.task.name );
  const [ editName,  allowEditName ] = useState(false);
  
  const setNemHeadName = (changeOrReset) => {
    if(changeOrReset){
      changeName(ids, taskName);
    }
    else onChangeName(route.params.task.name);
  };

  var value = null;
  try{
    if( route.params.task.more != undefined && route.params.task.more != ""){ 
      value = route.params.task.more.map((data, index) => {
        return(
        <Task key={index} index={index} specified={data.specified} nazwa={data.name} deadline={data.deadline} 
        day={data.data.day} month={data.data.month} year={data.data.year} more={data.more} 
        ended={data.ended} setV={setOVisibility} setT={setTaskID}/>
      );});
    }
  }catch(err){
    console.log(err);
  }

  //
  const Options = (props) => {
    try{
      if(route.params.task.more[taskID] === undefined) return null;
    
      // Zmiana nazwy
      const [ taskName, onChangeName ] = useState( route.params.task.more[taskID].name );
      const [ editName,  allowEditName ] = useState(false);
    
      const close = () => {
        allowEditName(false);
        setNemName(false);
        setOVisibility(false);
      };

      const setNemName = (changeOrReset) => {
        if(changeOrReset){
          let indexs = [...ids];
          indexs.push(taskID);
          changeName(indexs, taskName);
        }
        else onChangeName(route.params.task.more[taskID].name);
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
        <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => navigation.push('Task', {'task': route.params.task.more[taskID], 'index': ids.push(taskID)})}>
          <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
        </TouchableOpacity>
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
      {/* nagłówek - początek */}
        <View>
          <View style={[styles2.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
          <TextInput multiline={true} editable={editName} style={[styles2.optionsText, styles2.optionsTextInput, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={onChangeName} value={ taskName } />
            { editName ? 
            <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => { allowEditName(false); setNemHeadName(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.save} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { allowEditName(false); setNemHeadName(false) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.cross} />
            </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => { allowEditName(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
            </TouchableOpacity>
            }
          </View>
          <View style={[styles2.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
            <Text style={[styles2.headerText, {color: themeID.colorText1}]}>Deadline</Text>
          </View>
        </View>
      {/* nagłówek - koniec */}
      <ScrollView style={{zIndex: 1, width: "100%"}}>
      {/* Wypisywanie listy podZadań: */}
      {value}
      {/* Koniec listy podZadań */}
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

