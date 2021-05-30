import React, {useState, useRef, useContext, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { Route } from '@react-navigation/native';

import { eventControl } from '../data/eventControler';
import { DataContext } from '../data/DataContext';
import { dataString } from '../data/calendar';

import DeadlineChanger from '../components/deadlineChanger';
import DataEvent from '../components/events/dataEventChanger';
import { NavbarBack } from '../components/navbar';
import {WeeklyEventMenu, MothlyEventMenu, YearlyEventMenu} from '../components/events/repetetableEvents';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';
import SortTaskMenu from '../components/sortingTask';
import DeleteMenu from '../components/deleteMenu';
import NoteOptions from '../components/tagMenu';
import ConnectedTasks from '../components/lists/connectedTasks';
import ConnectedNotesEvents from '../components/lists/connectedNotes';
import {getMinuteText} from '../components/events/eventPanel';
import AddingMenu from '../components/addingMenuEventSpec';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import styles3 from '../styles/styleDeadlineChanger';
import sytles4 from '../styles/eventPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import { useIsFocused } from "@react-navigation/native";

export default EventSpec = ({navigation, route}) => {
  const { themeID } = useTheme();
  const { events, changeEventName, changeEventDate, changeEventDays, deleteTask, deleteEvent, deleteNote } = useContext(DataContext);

  const [name, setName] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [type, setType] = useState(null);
  const [h, setH] = useState(null);
  const [m, setM] = useState(null);
  const [week, setWeek] = useState(null);
  const [d, setD] = useState(false);

  const [data, setData] = useState(null);

  const [ addMenu, setAddMenu ] = useState(false);
  const [ changeData, setChangeData ] = useState(false);
  const [ editName,  allowEditName ] = useState(false);

  const mounted = useRef(false);
  //sprawdzanie czy komponent jest mounted
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  //wczytanie notatki
  const isFocused = useIsFocused();
  const refreshData = (da) => {
    if(da != null){
      setName(da.name);
      setDay(da._day);
      setMonth(da._month);
      setYear(da._year);
      setType(da.type);
      setH(da.hour);
      setM(da.minute);
      setWeek(da.dayWeek);
    }
  }

  useEffect(() => {
    if(isFocused){
      var d = eventControl.getEventByID(events, route.params.id);
      setData(d)
      refreshData(d);
    }
  }, [isFocused, events]);

  const changeName = (bool) => {
    if(bool){
        changeEventName(data.id, name);
    }else{
        setName(data.name);
    }
      allowEditName(false);
  }

  const changeDate = (bool) => {
      if(bool){
          changeEventDate(data.id, year, month, day, h, m);
      }else{
          setDay(data._day);
          setMonth(data._month);
          setYear(data._year);
          setH(data.hour);
          setM(data.minute);
      }
      setChangeData(false);
  }

  const changeWeek = (bool) => {
      if(bool){
          changeEventDays(data.id, week);
      }else{
          setWeek(data.dayWeek);
      }
      setChangeData(false);
  }

  const DeletePanel = () => {
      const confirm = (bool) => {
          if(bool){
              deleteEvent(data.id)
          }else{
              setD(false);
          }
      }
      return(
          <View>
              <Text>Czy chcesz usunąć wydarzenie?</Text>
              <View>
                  <TouchableOpacity onPress = {() => confirm(true)}>
                      <Text>Tak</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress = {() => confirm(false)}>
                      <Text>Nie</Text>
                  </TouchableOpacity>
              </View>
          </View>
      );
  }

  const ConfirmReturnButtons = (props) => {
    return(
        <>
        <TouchableOpacity style={[styles3.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.func(true);}}>
            <Text style={{color: themeID.colorText1}}>Potwierdź</Text>
        </TouchableOpacity>
        <View style={{height: 5}} />
        <TouchableOpacity style={[styles3.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.func(false);}}>
            <Text style={{color: themeID.colorText1}}>Anuluj</Text>
        </TouchableOpacity>
        </>
    );
}

const DataRow = () => {
  switch(type){
      case 0: return(
          <>
              <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>Data: {dataString(day, month + 1, year)}</Text>
          </>
      );
      case 1: return(
          <>
              <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>cotygodniowe</Text>
          </>
      );
      case 3: return(
        <>
            <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>Data: {dataString(day, month + 1, "")}</Text>
        </>
      );
      case 2: return(
        <>
            <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>Data: {day} każdego miesiąca</Text>
        </>
      );
  }
}

const DataChanger = () => {
  switch(type){
    case 0: return(
        <>
            <DataEvent day={day} setD={setDay} month={month} setM={setMonth} year={year} 
             setY={setYear} hour={h} setH={setH} minutes={m} setMin={setM} />
            <ConfirmReturnButtons func={changeDate} />
        </>
    );
    case 1: return(
        <>
            <WeeklyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} daily={week} setD={setWeek}/>
            <ConfirmReturnButtons func={changeWeek} />
        </>
    );
    case 3: return(
        <>
            <MothlyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} day={day} setD={setDay} />
            <ConfirmReturnButtons func={changeDate} />
        </>
    );
    case 2: return(
        <>
           <YearlyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} day={day} setD={setDay} month={month} setM={setMonth}/>
           <ConfirmReturnButtons func={changeDate} />
        </>
    );
  }
}

  if(data != null){
    return(
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
        <View style={{width: "100%", maxHeight: 200, marginBottom: 10}}>
          <View style={[sytles4.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
            <ScrollView style={{width:"100%"}}>
              <TextInput multiline={true} editable={editName} style={[styles2.optionsText, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={setName} value={ name } />
            </ScrollView>
            <View>
            { editName ?
              <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => { allowEditName(false); changeName(true) }}>
                  <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.save} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { allowEditName(false); changeName(false) }}>
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
          <View style={[sytles4.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
            <DataRow />
            <TouchableOpacity onPress={() => { setChangeData(true) }}>
              <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
            </TouchableOpacity>
          </View>
          <View style={[sytles4.headerContainer, {backgroundColor: themeID.colorHeader3}]}>
            <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>Godzina: {h}:{getMinuteText(m)}</Text>
          </View>
        </View>
        { changeData &&
          <View style={[sytles4.changerContainer, {backgroundColor: themeID.colorHeader2}]}>
              <DataChanger />
          </View>
        }
        <ScrollView style={{width: "100%"}}>
          <ConnectedNotesEvents id={data.id} navigation={navigation} />
          <View style={{height: 20}} />
          <ConnectedTasks id={data.id} navigation={navigation} />
        </ScrollView>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setAddMenu(true)}}>
            <Image source={icons.plus} style={styles2.buttonIcon} />
        </TouchableOpacity>
        { addMenu && <AddingMenu id={data.id} mode={0} close={()=>{setAddMenu(false)}}/>}
      </View>
    );
  }else{
    return(
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
        <Text>Nie wczytano danych</Text>
      </View>
    );
  }
};