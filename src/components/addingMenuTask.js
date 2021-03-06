import React, { useState, useRef, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';
import AddingNoteMenu from './addingPanelNotes';
import AddTaskMenu from './addingTask';
import {NoteSelector, TaskSelector} from './selector';

const AddingMenu = (props) => {

    const { themeID } = useTheme();

    const [mode, setMode] = useState(props.mode);

    const Header = (props) => {
        return(
            <View style={styles.header}>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton2}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
        );
    }

    const addNote = () => {

    }

    const Menu0 = () => {
        return(
            <View style={[styles.container, {backgroundColor: themeID.colorContainer, top: "30%"}]}>
                    <Header close={()=>{props.close()}} />
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton2}]}
                    onPress={() => {setMode(1)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz zadanie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton2}]}
                    onPress={() => {setMode(2)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj istniejącą notatkę</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton2}]}
                    onPress={() => {setMode(3)}}>
                        <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz notatkę</Text>
                    </TouchableOpacity>
                </View>
        );
    }

    const Menu1 = () => {
        return(
            <AddTaskMenu id={props.id} eID={0} close={() => {props.close()}}/>
        );
    }

    const Menu2 = () => {
        return(
            <NoteSelector tID={props.id} eID={0} close={() => {props.close()}} />
        );
    }

    const Menu3 = () => {
        return(
            <AddingNoteMenu mode={2} taskID={props.id} eventID={0} close={() => {props.close()}} />
        );
    }

    switch (mode) {
        case 0:
            return(
                <Menu0 close={()=>{props.close()}}/>
            );
        case 1:
            return(
                <Menu1 close={()=>{props.close()}}/>
            );
        case 2:
            return(
                <Menu2 close={()=>{props.close()}}/>
            );
        case 3:
            return(
                <Menu3 close={()=>{props.close()}}/>
            );
    }

    return null;
}

export default AddingMenu;