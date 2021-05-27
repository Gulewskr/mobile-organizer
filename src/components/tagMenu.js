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

    const { addCatalog, catalogs, getTagsByID, addNoteFromPanel } = useContext(DataContext);
    const { themeID } = useTheme();

    //props.close()
    const id = props.id
    //props.catalog

    //dane notatki
    const [ catalog, setCatalog] = useState(props.catalog);

    const Header = () => {
        return(
            <View style={styles.header}>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
        );
    }

    const TagMenu = () => {
        
        const [tags, setTags] = useState(null);

        const mounted = useRef(false);
        //sprawdzanie czy komponent jest mounted
        useEffect(() => {
            mounted.current = true;
            return () => (mounted.current = false);
        });
        useEffect(() => {
            getTagsByID(id).then(
                (result) => {
                    if(mounted.current){
                        setTags(result);
                    }
                });
        }, []);

        var value = null;
        if(tags != null)
        {
            try{
                value = tags.map((data, index) => {
                    return(
                        //TODO - dodać style i usuwanie tagów
                        <View key={index}><Text>{data.tag}</Text></View>
                    );
                  });
            }catch(err){
                console.log(err);
            }
        } 

        return(
            <View>
                {value}
            </View>
        );
    }

    const RMPicker = (params) => {
        try{
            return (
                <>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Zmień katalog</Text>
                <View style={styles.picker} >
                    <Picker
                        selectedValue={catalog} 
                        onValueChange={(itemValue, itemIndex) => 
                            setCatalog(itemValue)
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
                </>
            );
        }catch(err){
            console.log(err);
            return null;
        }
    }

    return (
        <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "30%"}]}>
            <Header />
            <RMPicker />
            //TODO - przycisk zapisz zapisuje notatkę w nowym katalogu
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]} onPress={()=>{console.log("zapisano")}}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Zapisz</Text>
            </TouchableOpacity>
            <TagMenu />
        </View>
    );
}

export default NoteOptions;