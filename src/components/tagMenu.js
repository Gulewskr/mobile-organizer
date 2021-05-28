import React, { useState, useEffect, useRef, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const NoteOptions = (props) => {

    const [loaded, setLoaded] = useState(false);
    const { getTagsByID, getCatalogs, deleteTagConnection, changeNoteCatalog, addTagToNote } = useContext(DataContext);
    const { themeID } = useTheme();

    //props.close()
    const id = props.id
    //props.catalog

    //dane notatki
    const [ catalogs, setCatalogs] = useState([]);
    const [tags, setTags] = useState(null);
    const [ catalog, setCatalog] = useState(props.catalog);

    const mounted = useRef(false);
    //sprawdzanie czy komponent jest mounted
    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    useEffect(() => {
        getCatalogs().then(
            (result) => {
                if(mounted.current){
                    setCatalogs(result);
                }
            }
        );
        getTags();
        setLoaded(true);
    }, [])

    const getTags = async() => {
        getTagsByID(id).then(
            (result) => {
                if(mounted.current){
                    setTags(result);
                }
            });
    }

    const Header = () => {
        return(
            <View style={styles.header}>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
        );
    }

    const changeCatalog = (catalog) => {
        changeNoteCatalog(id, catalog);
    }
    

    const TagMenu = () => {
        
        const [tagName, setTagName] = useState("nowy tag");

        const deleteTag = async(tag) => {
            try{
                await deleteTagConnection(id, tag);
                getTags();
            }catch (e){
                console.warn(e);
            }
        }

        const addNewTag = async() => {
            try{
                await addTagToNote(id, tagName);
                getTags();
            }catch (e){
                console.warn(e);
            }
        }

        var value = null;
        if(tags != null)
        {
            try{
                value = tags.map((data, index) => {
                    return(
                        <View key={index} style={[styles.tagItem, {backgroundColor: themeID.colorButton1}]}>
                            <Text>{data.tag}</Text>
                            <TouchableOpacity style={styles.tagItemIcon} onPress={()=>{deleteTag(data.tag)}}>
                                <Image style={styles.cross} source={icons.cross} />
                            </TouchableOpacity>
                        </View>
                    );
                  });
            }catch(err){
                console.log(err);
            }
        } 

        return(
            <>
            <View style={[styles.tagContainer, {backgroundColor: themeID.colorBackground}]} >
                <ScrollView contentContainerStyle={{flexDirection:"row", justifyContent:"center", alignItems:"center", flexWrap: "wrap" }} style={{maxHeight: 120, width: "100%"}}>
                    {value}
                </ScrollView>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <TextInput maxLength={25} multiline={false} onChangeText={setTagName} value={tagName} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
                <TouchableOpacity style={[styles.tagButton, {backgroundColor: themeID.colorButton1}]}
                  onPress={()=>{addNewTag(tagName); setTagName("tag");}}>
                    <Image style={styles.tagIconButton} source={icons.plus} />
                </TouchableOpacity>
            </View>
            </>
        );
    }

    const RMPicker = (params) => {
        try{
            
            return (
                <View style={styles.picker} >
                    <Picker
                        selectedValue={catalog} 
                        onValueChange={(itemValue, itemIndex) => 
                            {
                             setCatalog(itemValue);
                             changeCatalog(itemValue);}
                            }>
                            {
                            catalogs.map((data, index) => {
                                return(
                                    <Picker.Item key={index} useNativeAndroidPickerStyle={false} label={data.name} value={data.id} />
                                );
                            })
                            }
                    </Picker>
                </View>
            );
        }catch(err){
            console.log(err);
            return null;
        }
    }

    return (
        loaded?
        <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "30%"}]}>
            <Header />
            <Text style={[styles.font1, {color: themeID.colorText1}]}>Zmień katalog</Text>
            <RMPicker />
            <Text style={[styles.font1, {color: themeID.colorText1}]}>Zmień tagi</Text>
            <TagMenu />
        </View>
        :null
    );
}

export default NoteOptions;