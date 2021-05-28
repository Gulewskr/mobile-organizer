import React, { useState, useContext, useRef, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleSortPanel';
import styles2 from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const SortNoteMenu = (props) => {

    const { getTags, delteTag } = useContext(DataContext);
    const { themeID } = useTheme();

    //lista wszystkich tagów
    const [tagList, setTagList] = useState([]);
    const [remove, setRemove] = useState(false);

    //alfabetical - 0, 1, 2 sortowanie alfabetyczne
    const [aSort, setAsort] = useState(props.a);
    //tagsF - tablica tagów filtrowanych 
    const [tagSort, setTagSort] = useState(props.ta);
    const [tags, setTags ] = useState(props.t);
    //setF - ustawienie filtra
    const setFilter = () => {
        //utworzenie filtru (string)
        let filter = "";
        
        //SELECT * FROM notes 
        if(tags.length > 0 && tagSort)
        {
            filter += "AND id in (SELECT note From tagsConnection Where tag in (";
            for(let i=0; i<tags.length; i++)
            {
                filter += "'"+tags[i]+"'";
                if(i != tags.length - 1) filter += ",";
            }
            filter += "))"
        }
        //Where AND id in (SELECT note From tagsConnection Where tag in ('tag', 'tag3')) 
        //order by name desc
        switch(aSort){
            default: break;
            case 1: filter += "ORDER BY name ASC"; break;
            case 2: filter += "ORDER BY name DESC"; break;
        }
        props.setF(filter);
        props.setta(tagSort);
        props.setT(tags);
        props.setA(aSort);
    }

    const addToTags = (tag) => {
        if(tags.indexOf(tag) == -1 )
        {
            tags.push(tag);
        }
    }

    const removeFromTags = (tag) => {
        let id = tags.indexOf(tag)
        if(id != -1 )
        {
            tags.splice(id, 1);
        }
    }

    const ifTagIsActive = (tag) => tags.indexOf(tag) != -1

    //pobieranie listy tagów
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    const refreshTagList = () => { getTags().then((result) => {if(mounted.current){setTagList(result)}});}
    useEffect(() => {
        refreshTagList();
    }, []);

    const AlphabeticalSort = () => {
        return(
            <View style={[styles.sortContainer, {backgroundColor: themeID.colorButton1}]}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Sortuj alfabetycznie</Text>
                <View style={styles.picker} >
                    <Picker
                    selectedValue={aSort} 
                    onValueChange={(itemValue, itemIndex) => 
                        setAsort(itemValue)
                        }>
                        <Picker.Item useNativeAndroidPickerStyle={false} label="brak" value={0} />
                        <Picker.Item useNativeAndroidPickerStyle={false} label="A-Z" value={1} />
                        <Picker.Item useNativeAndroidPickerStyle={false} label="Z-A" value={2} />
                    </Picker>
                </View>
            </View>
            
        );
    }

    const TagSort = () => {

        const deleteTagDB = (tag) => {
            delteTag(tag);
            refreshTagList();
        }

        var value = null
        try{
            value = tagList.map((data, index) => {
                if(!remove){
                    const [active, setActive] = useState(ifTagIsActive(data.name));
                    return(
                        <View key={index} style={[styles2.tagItem, active ? {backgroundColor: themeID.colorButton1} : {backgroundColor: themeID.colorButtonUnchecked1, opacity: 0.5} ]}>
                            <Text>{data.name}</Text>
                            <TouchableOpacity style={styles2.tagItemIcon} onPress={()=>{ setActive(!active); active ? removeFromTags(data.name) : addToTags(data.name)}}>
                                <Image style={styles2.cross} source={active ? icons.cross : icons.plus} />
                            </TouchableOpacity>
                        </View>
                    );
                }else{
                    return(
                        <View key={index} style={[styles2.tagItem, {backgroundColor: themeID.colorButton1}]}>
                            <Text>{data.name}</Text>
                            <TouchableOpacity style={styles2.tagItemIcon} onPress={()=>{deleteTagDB(data.name)}}>
                                <Image style={styles2.cross} source={icons.trash} />
                            </TouchableOpacity>
                        </View>
                    );
                }
            })
        }catch (e){
            console.warn(e);
        }

        return(
            <>
            <Text style={[styles.font1, {color: themeID.colorText1, marginBottom: 5}]}>Wyświetl tylko z tagami</Text>
            <View style={styles2.tagFilterRow}>
                <View style={[styles2.tagContainerFilter, {backgroundColor: themeID.colorBackground}]} >
                    <ScrollView contentContainerStyle={{flexDirection:"row", justifyContent:"center", alignItems:"center", flexWrap: "wrap" }} style={{maxHeight: 120, width: "100%"}}>
                        {value}
                    </ScrollView>
                </View>
                <View style={styles2.tagFilterButtonContainer}>
                    <TouchableOpacity style={[styles2.tagFilterButton, tagSort? {backgroundColor: themeID.colorButton1} : {backgroundColor: themeID.colorButtonUnchecked1}]} onPress={()=>{setTagSort(!tagSort)}}>
                        <Image style={[styles2.cross, tagSort? {opacity: 1}: {opacity: 0.2}]} source={icons.checkmark} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles2.tagFilterButton, {backgroundColor: themeID.colorButton1}]}
                        onPress={() => setRemove(!remove)}>
                        <Image style={styles2.cross} source={remove ? icons.cross : icons.trash} />
                    </TouchableOpacity>
                </View>
            </View>
            </>
        );
    }

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.header}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Filtr</Text>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            <AlphabeticalSort />
            <TagSort />
            <TouchableOpacity style={[styles.acceptButton, {backgroundColor: themeID.colorButton1}]}
                onPress={() => {setFilter(); props.close()}}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Zastosuj</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SortNoteMenu;