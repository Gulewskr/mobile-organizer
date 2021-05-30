import React, {useState, useRef, useContext, useEffect} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import {DataContext} from '../data/DataContext';
import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';
import AddingNoteMenu from '../components/addingPanelNotes';
import SortMenu from '../components/sortingNotes';
import Note from '../components/note';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import {useTheme} from '../data/colors.js';

export default Notes = ({navigation}) => {
  
  const { getCatalogs, getTags, getNotesFromCatalog, deleteCatalog, deleteNote } = useContext(DataContext);
  const { themeID } = useTheme();
  
  const [addMenu, setAddMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  //alfabetycznie
  const [alfabetical, setAlfabetical] = useState(0);
  //lista tagów
  const [tags, setTags] = useState(null);
  const [tagA, setTA] = useState(false);
  //polecenie filtra dla bazy danych
  const [filter, setFilter] = useState('');

  const [removeMenu, setRemoveMenu] = useState(false);
  const [catalogList, setCatalogList] = useState(null);
  //przekazywana zmienna do elementów - zmiana odświerza dane
  const [refresh, setRefresh] = useState(false);

  const mounted = useRef(false);
  //sprawdzanie czy komponent jest mounted
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  //ID zadań do usunięcia
  const [notesToRemove, setNotesToRemove] = useState([]);
  //ID katalogów do usunięcia
  const [catalogsToRemove, setCatalogsToRemove] = useState([]);

  const resetRevomeLists = () => {
    console.log("reset list do usuwania");
    setNotesToRemove([]);
    setCatalogsToRemove([]);
  }

  const remove = () => {
    for(let i = 0; i < notesToRemove.length; i++)
    {
      deleteNote(notesToRemove[i]);
    }
    for(let i = 0; i < catalogsToRemove.length; i++)
    {
      deleteCatalog(catalogsToRemove[i]);
    }
    setRefresh(!refresh);
  }

  const addNoteToList = (noteID) => {
    if(notesToRemove.indexOf(noteID) == -1 )
      notesToRemove.push(noteID);
  }

  const removeNoteFromList = (noteID) => {
    let notesCopy = [... notesToRemove];
    var id = notesCopy.indexOf(noteID);
    if(id != -1){
      notesCopy.splice(id, 1);
      setNotesToRemove(notesCopy);
    }
  }

  const checkIFExistInNoteRemoveList = (noteID) => {
    return (notesToRemove.indexOf(noteID) != -1);
  }

  const addCatalogToList = (catalogID) => {
    if(catalogsToRemove.indexOf(catalogID) == -1 )
      catalogsToRemove.push(catalogID);
  }

  const removeCatalogFromList = (catalogID) => {
    let copy = [...catalogsToRemove];
    var id = copy.indexOf(catalogID);
    if(id != -1){
      copy.splice(id, 1);
      setCatalogsToRemove(copy);
    }
  }

  const checkIFExistInCatalogRemoveList = (catalogID) => {
    return (catalogsToRemove.indexOf(catalogID) != -1);
  }

  const setActiveMenu = (activeID) => {
    setAddMenu(activeID == 0);
    setSortMenu(activeID == 1);
    setRemoveMenu(activeID == 2);
    setRefresh(!refresh);
  }

  const goToTask = (id) => {
    navigation.push('Note', {'id': id});
  }

  const SingleCatalog = (props) => {

    const [notes, setNotes] = useState(null);
    const [v, setV] = useState(false);
    const [d, setD] = useState(checkIFExistInCatalogRemoveList(props.id));

    const mounted = useRef(false);

    var changeD = () => {
      if(d)
      {//odznaczanie
        setD(false);
        removeCatalogFromList(props.id);
      }else{//zaznaczanie
        setD(true);
        addCatalogToList(props.id);
      }
    }

    const NoteToDelete = (props) => {
      const [toDelete, setToDelete] = useState(checkIFExistInNoteRemoveList(props.data.id) || d);

      useEffect(() => {
        setToDelete(false);
        if(d){
          setToDelete(true);
        }
      }, [removeMenu, d]);

      const change = () => {
        if(toDelete)
        {//odznaczanie
          if(!d){
            setToDelete(false);
            removeNoteFromList(props.data.id);
          }
        }else{//zaznaczanie
          setToDelete(true);
          addNoteToList(props.data.id);
          console.log("dodaje " + props.data.id);
        }
      }

      return(
        <View style={[styles2.taskContainer, {backgroundColor: themeID.colorContainer}]}>
          <Text style={{fontSize: 20, color: themeID.colorText1, width:"80%"}}>{props.data.name}</Text>
          <TouchableOpacity style={[styles2.iconContainer2, {backgroundColor: themeID.colorButton1}]} 
          onPress={() => change()}>
            <Image source={icons.trash} style={[styles2.icon, toDelete?{opacity: 1}:{opacity: 0.2}]} />
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
      getNotesFromCatalog(props.id, filter).then((result) => {if(mounted.current){setNotes(result)}});
    }, [props.refresh, isFocused]);

    
    var value = null;

    var show = (notes != null && notes != undefined && notes.length != 0);

    if(show)
      try{
        value = notes.map((data, index) => {
          if(removeMenu){
            return(
              <NoteToDelete key={data.id} data={data} />
            );
          }else{
            return(
              <Note key={data.id} data={data} press={() => {goToTask(data.id)}} />
            );
          }
        })
      }catch(err){
        console.log(err);
      }
    var switcher = removeMenu && props.name != "Notatki";
    return(
      <>
        <View style={styles2.sectorHeader}>
          <View style={ switcher ? {width: "75%"} : {width: "85%"}}>
            <Text style={[styles2.taskText, {marginLeft:"2%", color: themeID.colorText2}]}>{props.name}</Text>
            <View style={[styles2.line,{backgroundColor: themeID.colorText2}]}/>
          </View>
          { switcher &&
            <TouchableOpacity style={styles2.headerButton} onPress={() => {changeD()}}>
              <Image source={icons.trash} style={[styles2.icon, d?{opacity: 1}:{opacity: 0.2}]} />
            </TouchableOpacity>
          }
          {show &&
          <TouchableOpacity style={styles2.headerButton} onPress={() => {setV(!v)}}>
            <Image source={v ? icons.arrowUp : icons.arrowDown} style={styles2.icon} />
          </TouchableOpacity>
          }
        </View>
        { v && value }
      </>
    );
  }

  useEffect(() => {
    try{
      
      getCatalogs().then(
        (result) => {
          if(mounted.current){
            setCatalogList(
              result.map((data, index) => {
                return(
                  <SingleCatalog key={data.id} id={data.id} name={data.name} refresh={refresh} />
                );
              })
            );
          }
      });
      
      if(tags == null) getTags().then((result) => {if(mounted.current){
        var tagsTable = [];
        result.map((data, index)=> {
          tagsTable.push(data.name);
        })
        console.log(tagsTable);
        setTags(tagsTable);
      }});
    }catch(err){
      console.log(err);
    }
  }, [refresh]);

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Notatki'} navigate={navigation} />
      {
        <ScrollView style = {{width: "100%", marginTop: 10}}>
          {catalogList}
        </ScrollView>
      }
      {addMenu ?
        /* dodawanie notatek */
        <AddingNoteMenu mode={0} taskID={0} eventID={0} close={() => {setRefresh(!refresh); setAddMenu(false)}} />
        :
        null
        }
      {sortMenu ?
        /* sortowanie notatek */
        <SortMenu setF={setFilter} ta={tagA} setta={setTA} a={alfabetical} setA={setAlfabetical} t={tags} setT={setTags} close={()=>{setActiveMenu(-1);}} />
        :
        null
      }
      {removeMenu?
      <>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} 
          onPress={()=> {setActiveMenu(-1); remove(); resetRevomeLists();}} >
          <Image source={icons.checkmark} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} 
        onPress={()=> {setActiveMenu(-1); resetRevomeLists()}} >
          <Image source={icons.cross} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </>
      :
      <>
        <TouchableOpacity activeOpacity={1} style={[styles2.addButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(0);}}>
          <Image source={icons.plus} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.sortButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(1);}}>
          <Image source={icons.sort} style={styles2.buttonIcon} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} style={[styles2.deleteButton,{backgroundColor: themeID.colorButton1}]} onPress={()=> {setActiveMenu(2)}} >
          <Image source={icons.trash} style={styles2.buttonIcon} />
        </TouchableOpacity>
      </>
      }
    </View>
  );
};