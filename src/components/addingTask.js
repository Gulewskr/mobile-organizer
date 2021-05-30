import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DeadlineChooser} from './deadlineChanger';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const AddTaskMenu = (props) => {

    const { addNewTask } = useContext(DataContext);
    const { themeID } = useTheme();

    const [ name, setName ] = useState("nazwa zadania");
    
    const [ haveDeadline, setHaveDeadline ] = useState(false);
    var currentTime = new Date();
    const [ day, setDay ] = useState(currentTime.getDate());
    const [ month, setMonth ] = useState(currentTime.getMonth());
    const [ year, setYear ] = useState(currentTime.getFullYear());

    /*
    Dodanie do zmieniania deadlineu
    można wykorzystać elementy z deadlineChanger
    const 
    */
    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}, haveDeadline ? {top: "30%"} : {top: "40%"}]}>
            <View style={styles.header}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj zadanie</Text>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            {/* - nazwa - */}
            <TextInput multiline={true} onChangeText={setName} value={name} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
            {/* - deadline - */}
            {/* dodać zmianę tła przycisku od haveDeadline */}
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={[styles.font2, {color: themeID.colorText1}]}>Deadline</Text>
                <TouchableOpacity style={[styles.buttonIconMain,haveDeadline ? {backgroundColor: themeID.colorButton1} : {backgroundColor: themeID.colorButtonUnchecked1}]}
                onPress={() => setHaveDeadline(!haveDeadline) }
                >
                    <Image style={[styles.buttonIcon, haveDeadline?{opacity:1}:{opacity:0.2}]} source={icons.checkmark} />
                </TouchableOpacity>
            </View>
            {
                haveDeadline && <DeadlineChooser day={day} setDay={setDay} month={month} setMonth={setMonth} year={year} setYear={setYear} />
            }
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}
            onPress={() => {
                 //addItemTask(props.ids, name, haveDeadline, day, month, year); props.close() 
                 addNewTask(name, haveDeadline, day, month + 1, year, props.id, props.eID); props.close()
                }}
            >
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTaskMenu;