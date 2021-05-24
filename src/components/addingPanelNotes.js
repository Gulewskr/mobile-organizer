import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const AddingNoteMenu = (props) => {

    const { addCatalog, catalogs, addTag } = useContext(DataContext);
    const { themeID } = useTheme();

    const [ name, setName ] = useState("Wpisz nazwę");
    const [ menu, setMenu ] = useState(props.mode);

    const [ catalog, setCatalog] = useState(1);

    const Header = () =>{
        return(
            <View style={styles.header}>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
        );
    }

    const TagAddMenu = () => {
        const [ tagName, setTagName ] = useState("tag");
        const [ tags, setTags ] = useState([]);

        const addTagToTags = (tag) => {
            var tagsCopy = [...tags];
            tagsCopy.push(tag);
            setTags(tagsCopy);
        }

        const removeTag = (tag) => {
            var tagsCopy = [...tags];
            var id = tagsCopy.indexOf(tag);
            if(id != -1){
                tagsCopy.splice(id, 1);
                setIdToDelete(tagsCopy);
            }
        }

        return(
            <View style={[styles.tagContainer, {backgroundColor: themeID.colorBackground}]} >
                <View style={{flexDirection:"row"}}>
                {
                    tags.map((data, index) => {
                        return(
                            <View key={index} ><Text>{data}</Text></View>
                        );
                })

                }</View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <TextInput maxLength={25} multiline={false} onChangeText={setTagName} value={tagName} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
                    <TouchableOpacity style={[styles.tagButton, {backgroundColor: themeID.colorButton1}]}
                        onPress={()=>{addTag(tagName); addTagToTags(tagName); setTagName("tag");}}>
                        <Image style={styles.tagIconButton} source={icons.plus} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const RMPicker = (params) => 
    {
        try{
            return (
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
            );
        }catch(err){
            console.log(err);
        }
    }

    switch (menu) {
        case 0:
            return(
                <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
                    <Header />
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => {setMenu(1)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz katalog</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => {setMenu(2)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj notatkę</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        case 1:
            return(
                <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
                    <Header />
                    <TextInput multiline={true} onChangeText={setName} value={name} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => { addCatalog(name); props.close() }}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz katalog</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        case 2:
            return(
                <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
                    <Header />
                    <TextInput multiline={true} onChangeText={setName} value={name} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
                    <RMPicker />
                    <TagAddMenu />
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => { addCatalog(name); props.close() }}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj notatkę</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        default:
            return(
                <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
                    <Header />
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => {setMenu(1)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz katalog</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
                    onPress={() => {setMenu(2)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj notatkę</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
    }
}

export default AddingNoteMenu;