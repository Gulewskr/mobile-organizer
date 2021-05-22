import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { Route } from '@react-navigation/native';

import { DataContext } from '../data/DataContext';
import { dataString } from '../data/calendar';

import DeadlineChanger from '../components/deadlineChanger';
import { NavbarBack } from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';
import SortTaskMenu from '../components/sortingTask';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import { useIsFocused } from "@react-navigation/native";

export default TaskSpec = ({navigation, route}) => {
  const { task, tasks, setTaskID, changeName, PrevID } = useContext(DataContext);
  const { themeID } = useTheme();
  const [oVisibility, setOVisibility] = useState(false);
  const [taskID, setTaskid] = useState(0);
  const [ oTask, setOTask ] = useState(null);

  // Zmiana deadline
  const [ dVisibility, setDVisibility ] = useState(false);

  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);
  
  // Zmiana nazwy
  const [ accName, setAccName ] = useState( route.params.name );
  const [ taskName, onChangeName ] = useState( route.params.name );
  const [ editName,  allowEditName ] = useState(false);

  //gdy ekran jest aktywny wczytywane są wartości
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused){     
      setTaskID(route.params.id);
    }
  }, [isFocused]);

  try{

    const setNemHeadName = (changeOrReset) => {
      if(changeOrReset){
        changeName(route.params.id, taskName);
      }
      else onChangeName(task.name);
    };

    var value = null;
    
      if( tasks != undefined && tasks != ""){ 
        value = tasks.map((data, index) => {
          return(
            <Task key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
            day={data._day} month={data._month} year={data._year} ended={data.ended} 
            showOptions={ () => { setAddMenu(false); setOVisibility(true) }} setId={()=>{setTaskid(data.id); setOTask(data);}}/>
        );});
      }
    

    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Zadania'} navigate={navigation} />
        {/* nagłówek - początek */}
        <View style={{width: "100%", maxHeight: "20%", marginBottom: -20}}>
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
              task.deadline ?
              <Text style={[styles2.deadlineText]}>{dataString(task._day, task._month, task._year)}</Text>
              :
              <Text style={[styles2.deadlineText]}>brak</Text>
            }
            <TouchableOpacity onPress={() => { setDVisibility(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
            </TouchableOpacity>
          </View>
        </View>
        {/* nagłówek - koniec */}
        <ScrollView style={{zIndex: 1, width: "100%"}}>
          {/* Wypisywanie listy podZadań: */}
          {value}
          <View style={{marginBottom: 200}}/>
          {/* Koniec listy podZadań */}
        </ScrollView>
        { dVisibility && <DeadlineChanger ids={task.id} day={task._day} month={task._month - 1} year={task._year} deadline={task.deadline} close={()=>setDVisibility(false)}/> }
        { 
        oVisibility &&
        <> 
        <TaskOptions id={taskID} task={oTask} close={() => setOVisibility(false)} navigation={()=>{navigation.push('Task', {'id': taskID, 'name': oTask.name})}} /> 
        <TouchableOpacity style={styles.fillRect} onPress={() => setOVisibility(false)}/>
        </>
        }
        { addMenu && <AddTaskMenu id={task.id} close={() => setAddMenu(false)}/>}
        { sortMenu && <SortTaskMenu id={task.id} close={() => setSortMenu(false)} />}
        <TouchableOpacity activeOpacity={1} style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setOVisibility(false) ;setAddMenu(true)}}>
          <Image source={icons.plus} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]}>
          <Image source={icons.sort} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]}>
          <Image source={icons.trash} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  }catch(err){
    console.log(err);
  }
  return null;   
};

