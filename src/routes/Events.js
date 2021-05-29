import React, { useState, useContext, useEffect, useRef } from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import {NavbarBack} from '../components/navbar';
import EventMenu from '../components/events/eventMenu'; 
import AddingEventMenu from '../components/events/addEvent';

import { icons } from '../components/icons';
import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import {useTheme} from '../data/colors.js';
import {DataContext} from '../data/DataContext';

export default Events = ({navigation}) => {
  const { themeID } = useTheme();

  const [ addMenu, setAddMenu ] = useState(false);
  const [ removeMenu, setRemoveMenu ] = useState(false);
  const [ optionMenu, setOptionMenu ] = useState(false);

  const setActionMenu = (mode) => {
    setAddMenu(mode == 0);
    setRemoveMenu(mode == 1);
    setOptionMenu(mode == 2);
  }

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
      <ScrollView style = {{marginTop: 10, width: "100%"}}>
        <EventMenu />
      </ScrollView>
      {addMenu && <AddingEventMenu close={()=>{setActionMenu(-1);}} />}
      {removeMenu && null}
      {optionMenu && null}
      {removeMenu ?
      <>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActionMenu(-1); refreshEvents();}}>
          <Image source={icons.checkmark} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActionMenu(-1); refreshEvents();}} >
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