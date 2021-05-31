import React, { useState, useRef, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const Header = (props) =>{
    const { themeID } = useTheme();
    return(
        <View style={styles.header}>
            <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton2}]} onPress={() => props.close()}>
                <Image style={styles.exitButtonIcon} source={icons.cross} />
            </TouchableOpacity>
        </View>
    );
}

const NoteSelector = (props) => {
    //props.eID props.tID
    const { notes, changeNoteConnection } = useContext(DataContext);
    const { themeID } = useTheme();

    if(notes == undefined || !Array.isArray(notes) || notes.length < 1) props.close();
    const [noteID, setNoteID] = useState((notes == undefined || notes[0] == undefined)? 0: notes[0].id );

    const eID = props.eID;
    const tID = props.tID;

    const addNote = () => {
        changeNoteConnection(eID, tID, noteID);
        props.close();
    }

    const RMPicker = () => 
    {
        try{
            return (
                <View style={styles.picker} >
                    <Picker
                        selectedValue={noteID} 
                        onValueChange={(itemValue, itemIndex) => 
                            setNoteID(itemValue)
                            }>
                            {
                            notes.map((data, index) => {
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

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
            <Header close={()=>{props.close()}}/>
            <RMPicker />
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton2}]}
            onPress={() => {addNote()}}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj notatkę</Text>
            </TouchableOpacity>
        </View>
    );
}

const TaskSelector = (props) => {
    //props.eID props.tID
    const { allTasks, changeTaskConnection } = useContext(DataContext);
    const { themeID } = useTheme();

    if(allTasks == undefined || !Array.isArray(allTasks) || allTasks.length < 1) props.close();
    const [taskID, setTaskID] = useState((allTasks == undefined || allTasks[0] == undefined)? 0 : allTasks[0].id);

    const eID = props.eID;

    const addNote = () => {
        changeTaskConnection(eID, taskID);
        props.close();
    }

    const RMPicker = () => 
    {
        try{
            return (
                <View style={styles.picker} >
                    <Picker
                        selectedValue={taskID} 
                        onValueChange={(itemValue, itemIndex) => 
                            setTaskID(itemValue)
                            }>
                            {
                            allTasks.map((data, index) => {
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

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "40%"}]}>
            <Header close={()=>{props.close()}}/>
            <RMPicker />
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton2}]}
            onPress={() => {addNote()}}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj notatkę</Text>
            </TouchableOpacity>
        </View>
    );
}

export {TaskSelector, NoteSelector}
export default NoteSelector;