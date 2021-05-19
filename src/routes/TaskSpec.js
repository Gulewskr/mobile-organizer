import React, {useState, useContext} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { Route } from '@react-navigation/native';

import { DataContext } from '../data/DataContext';
import { dataString } from '../data/calendar';

import DeadlineChanger from '../components/deadlineChanger';
import { NavbarBack } from '../components/navbar';
import TaskOptions from '../components/taskOptions';
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

  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);

  const ids = route.params.index;

  const getOptionTaskIDS = () => {
    var indeksy = [...ids];
    indeksy.push(taskID);
    return indeksy;
  }

  // Zmiana nazwy
  const [ taskName, onChangeName ] = useState( route.params.task.name );
  const [ editName,  allowEditName ] = useState(false);

  const setNemHeadName = (changeOrReset) => {
    if(changeOrReset){
      changeName(ids, taskName);
    }
    else onChangeName(route.params.task.name);
  };

  // Zmiana deadline
  const [ dVisibility, setDVisibility ] = useState(false);


  var value = null;
  try{
    if( route.params.task.more != undefined && route.params.task.more != ""){ 
      value = route.params.task.more.map((data, index) => {
        return(
        <Task key={index} index={index} nazwa={data.name} deadline={data.deadline} 
        day={data.data.day} month={data.data.month} year={data.data.year} more={data.more} 
        ended={data.ended} showOptions={ () => { setAddMenu(false); setOVisibility(true) }} setId={()=>{setTaskID(index)}}/>
      );});
    }
  }catch(err){
    console.log(err);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Zadania'} navigate={navigation} />
      {/* nagłówek - początek */}
        <View style={{width: "100%", maxHeight: "20%"}}>
          <View style={[styles2.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
          <ScrollView style={{width:"70%"}}>
           <TextInput multiline={true} editable={editName} style={[styles2.optionsText, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={onChangeName} value={ taskName } />
          </ScrollView>
          <View>
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
          </View>
          <View style={[styles2.headerContainer2, {height: "35%", backgroundColor: themeID.colorHeader3}]}>
            <Text style={[styles2.headerText, {color: themeID.colorText1}]}>Deadline </Text>
            {
            route.params.task.deadline ?
            <Text style={[styles2.deadlineText]}>{dataString(route.params.task.data.day, route.params.task.data.month, route.params.task.data.year)}</Text>
            :
            <Text style={[styles2.deadlineText]}>brak</Text>
            }
            <TouchableOpacity onPress={() => { setDVisibility(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
            </TouchableOpacity>
          </View>
        </View>
        {
          dVisibility && <DeadlineChanger ids={ids} day={route.params.task.data.day} month={route.params.task.data.month - 1} year={route.params.task.data.year} deadline={route.params.task.deadline} close={()=>setDVisibility(false)}/>
        }
      {/* nagłówek - koniec */}
      <ScrollView style={{zIndex: 1, width: "100%"}}>
        {/* Wypisywanie listy podZadań: */}
        {value}
        <View style={{marginBottom: 200}}/>
        {/* Koniec listy podZadań */}
      </ScrollView>
      { 
      oVisibility ?
      <View style={styles2.optionContainer}>
        <TaskOptions key={taskID} ids={getOptionTaskIDS()} close={() => setOVisibility(false)} navigation={navigation} />
      </View>
      :
      null
      }
      <TouchableOpacity style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setOVisibility(false) ;setAddMenu(true)}}>
        <Image source={icons.plus} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]}>
        <Image source={icons.sort} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]}>
        <Image source={icons.trash} style={styles2.buttonIcon} />
      </TouchableOpacity>
    </View>
  );   
};

