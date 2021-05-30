import React, { useState, useContext, useEffect, useRef } from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import {NavbarBack} from '../components/navbar';
import EventMenu from '../components/events/eventMenu'; 
import AddingEventMenu from '../components/events/addEvent';
import EventOptions from '../components/events/optionPanel';

import { icons } from '../components/icons';
import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import {useTheme} from '../data/colors.js';
import {DataContext} from '../data/DataContext';

export default Events = ({navigation}) => {
  const { themeID } = useTheme();
  const { deleteEvent } = useContext(DataContext);

  const [ addMenu, setAddMenu ] = useState(false);
  const [ removeMenu, setRemoveMenu ] = useState(false);
  const [ optionMenu, setOptionMenu ] = useState(false);

  const [ e, setEID] = useState(0);
  const [ toDelete, setToDelete ] = useState([]);

  const addToRemove = (id) => {
    if(toDelete.indexOf(id) == -1)
    {
      toDelete.push(id);
    }
  }

  const removeFromRemove = (id) => {
    var pos = toDelete.indexOf(id);
    if(pos != -1){
      toDelete.slice(pos, 1);
    }
  }

  const resetRemoveList = () => setToDelete([])
  const removeUsingList = () => {
    for(let i=0; i<toDelete.length; i++)
    {
      deleteEvent(toDelete[i]);
    }
    resetRemoveList();
  }

  const setActionMenu = (mode) => {
    setAddMenu(mode == 0);
    setRemoveMenu(mode == 1);
    setOptionMenu(mode == 2);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
      <ScrollView style = {{marginTop: 10, width: "100%"}}>
        <EventMenu remove={removeMenu} option={setOptionMenu} optionID={setEID}
          removeAdd={addToRemove} removeDel={removeFromRemove}
        />
      </ScrollView>
      {addMenu && <AddingEventMenu close={()=>{setActionMenu(-1);}} />}
      {optionMenu && <EventOptions data={e} navigation={navigation} close={()=>{setActionMenu(-1);}} />}
      {removeMenu ?
      <>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {removeUsingList(); setActionMenu(-1);}}>
          <Image source={icons.checkmark} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {resetRemoveList(); setActionMenu(-1);}} >
          <Image source={icons.cross} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </>
      :
      <>
        <TouchableOpacity activeOpacity={1} style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActionMenu(0);}}>
          <Image source={icons.plus} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActionMenu(1)}} >
          <Image source={icons.trash} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </>
      }
    </View>
  );
};