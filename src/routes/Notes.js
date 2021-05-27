import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import {DataContext} from '../data/DataContext';
import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';
import AddingNoteMenu from '../components/addingPanelNotes';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import {useTheme} from '../data/colors.js';

export default Notes = ({navigation}) => {
  
  const { catalogs, setTaskID, addNoteFromPanel, getNotesFromCatalog } = useContext(DataContext);
  const { themeID } = useTheme();
  
  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);

  //przekazywana zmienna do elementów - zmiana odświerza dane
  const [refresh, setRefresh] = useState(false);


  const setActiveMenu = (activeID) => {
    setAddMenu(activeID == 0);
    setSortMenu(activeID == 1);
    setRemoveMenu(activeID == 2);
  }

  const goToTask = (id) => {
    navigation.push('Note', {'id': id});
  }

  const SingleCatalog = (props) => {

    const [notes, setNotes] = useState(null);
    
    const mounted = useRef(false);

    const Note = (props) => {
      return(
        <View style={[styles2.taskContainer, {backgroundColor: themeID.colorContainer}]}>
          <Text style={{fontSize: 20, color: themeID.colorText1, width:"80%"}}>{props.data.name}</Text>
          <TouchableOpacity style={[styles2.iconContainer2, {backgroundColor: themeID.colorButton1}]} 
          onPress={() => goToTask(props.data.id)}>
            <Image source={icons.arrowRight} style={styles2.icon} />
          </TouchableOpacity>
        </View>
      );
    }

    //sprawdzanie czy komponent jest 
    useEffect(() => {
      mounted.current = true;
      return () => (mounted.current = false);
    });

    const isFocused = useIsFocused();
    //pobranie notatek dla danego katalogu
    useEffect(() => {
      getNotesFromCatalog(props.id).then((result) => {if(mounted.current){setNotes(result)}});
    }, [props.refresh, isFocused]);

    var value = null;

    if(notes != null && notes != undefined)
      try{
        value = notes.map((data, index) => {
          return(
            <Note key={data.id} data={data} />
          );
        })
      }catch(err){
        console.log(err);
      }

    return(
      <>
        <View style={styles2.sectorHeader}>
          <Text style={[styles2.taskText, {marginLeft:"2%", color: themeID.colorText2}]}>{props.name}</Text>
          <View style={[styles2.line,{backgroundColor: themeID.colorText2}]}/>
        </View>
        {value}
      </>
    );
  }

  var value = null;
  
  try{
      value = catalogs.map((data, index) => {
        return(
          <SingleCatalog key={data.id} id={data.id} name={data.name} refresh={refresh} />
        );
      });
  }catch(err){
    console.log(err);
  }

  //value = <SingleCatalog key={1} id={1} name={"Katalog 1"} />;

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Notatki'} navigate={navigation} />
      {removeMenu ?
        null
        :
        <ScrollView style = {{width: "100%", marginTop: 10}}>
          {value}
        </ScrollView>
      }
      {addMenu ?
        /* dodawanie notatek */
        <AddingNoteMenu mode={0} close={() => {setRefresh(!refresh); setAddMenu(false)}} />
        :
        null
        }
        {sortMenu ?
        /* sortowanie notatek */
        <View>
          <Text>sortowanie</Text>
        </View>
        :
        null
        }
      <TouchableOpacity activeOpacity={1} style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(0);}}>
        <Image source={icons.plus} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(1);}}>
        <Image source={icons.sort} style={styles2.buttonIcon} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(2)}} >
        <Image source={icons.trash} style={styles2.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};