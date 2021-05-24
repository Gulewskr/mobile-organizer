import React, {useState, useContext} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import {DataContext} from '../data/DataContext';
import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';
import AddingNoteMenu from '../components/addingPanelNotes';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import {useTheme} from '../data/colors.js';

export default Notes = ({navigation}) => {
  
  const { catalogs, setTaskID, addNoteFromPanel } = useContext(DataContext);
  const { themeID } = useTheme();
  
  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  const [removeMenu, setRemoveMenu] = useState(false);

  const setActiveMenu = (activeID) => {
    setAddMenu(activeID == 0);
    setSortMenu(activeID == 1);
    setRemoveMenu(activeID == 2);
  }

  const SingleCatalog = (props) => {


    return(
      <>
        <View style={styles2.sectorHeader}>
          <Text style={[styles2.taskText, {marginLeft:"2%", color: themeID.colorText2}]}>{props.name}</Text>
          <View style={[styles2.line,{backgroundColor: themeID.colorText2}]}/>
        </View>
      </>
    );
  }

  var value = null;
  
  try{
      value = catalogs.map((data, index) => {
        return(
          <SingleCatalog key={data.id} id={data.id} name={data.name} />
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
        <AddingNoteMenu mode={0} close={() => {setAddMenu(false)}} />
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