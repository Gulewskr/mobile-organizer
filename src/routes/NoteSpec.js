import React, {useState, useRef, useContext, useEffect} from 'react';
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
import DeleteMenu from '../components/deleteMenu';
import NoteOptions from '../components/tagMenu';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import { useIsFocused } from "@react-navigation/native";

export default NoteSpec = ({navigation, route}) => {
  
  const { getNote, changeNoteName } = useContext(DataContext);
  const { themeID } = useTheme();
  const [ note, setNote ] = useState(null);

  const [tagMenu, setTagMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);
  
  // Zmiana nazwy
  const [ name, changeName ] = useState("");
  const [ editName,  allowEditName ] = useState(false);

  // Zmiana treści notatki
  const [ text, changeText ] = useState("");

  const setActiveMenu = (activeID) => {
    setEdit(activeID == 0);
    setTagMenu(activeID == 1);
    setRemoveMenu(activeID == 2);
  }

  const mounted = useRef(false);
  //sprawdzanie czy komponent jest mounted
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  //wczytanie notatki
  const isFocused = useIsFocused();
  useEffect(() => {
    if(isFocused){
        getNote(route.params.id).then(
          (result) => {
            if(mounted.current){
              setNote(result); 
              changeName(result.name);
              changeText(result.value);
            }
          });
    }
  }, [isFocused]);

 

  const TaskHeader = () => {

    const [ noteName,  setNoteName ] = useState(name)

    const setNewNoteName = (bool) => {
      if(bool){
        changeNoteName(note.id, noteName);
        changeName(noteName)
      }else{
        setNoteName(name);
      }
    }

    return(
      <View style={[styles2.headerContainerNotes, {backgroundColor: themeID.colorHeader3}]}>
        <TouchableOpacity onPress={() => { setActiveMenu(1) }}>
          <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.tag} />
        </TouchableOpacity>
        <ScrollView style={{width:"60%"}}>
          <TextInput multiline={true} editable={editName} style={[styles2.optionsText, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={setNoteName} value={ noteName } />
        </ScrollView>
        <View>
        { editName ?
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={() => { allowEditName(false); setNewNoteName(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.save} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { allowEditName(false); setNewNoteName(false) }}>
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
      );
  }
  //TODO - usuwanie, edycja notatki
  try{
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Notatki'} navigate={navigation} />
        <View style={{width: "100%", maxHeight: "20%", marginBottom: -20}}>
          <TaskHeader />
        </View>
        {/* Wypisywanie listy zadań: */}
        <ScrollView style={{zIndex: 1, width: "100%"}}>
          <Text>{text}</Text> 
          <View style={{marginBottom: 200}}/>
        </ScrollView>
        {/* Koniec listy zadań */}
        { edit ?
        null
        : 
        <>
          { tagMenu && <NoteOptions id={note.id} catalog={note.catalog} close={()=>{setTagMenu(false)}}/>}
          <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} 
          onPress={()=> {setActiveMenu(2)}}>
            <Image source={icons.pen} style={styles2.buttonIcon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} 
          onPress={()=> {setActiveMenu(3)}}>
            <Image source={icons.trash} style={styles2.buttonIcon} />
          </TouchableOpacity>
        </>
        }
      </View>
    );
  }catch(err){
    console.log(err);
  }
  return null;   
};

