import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const AddTaskMenu = (props) => {

    //funkcja dodająca zadanie
    //const {} = useContext(DataContext);
    const { themeID } = useTheme();

    const [ name, setName ] = useState("nazwa zadania");
    
    const [ haveDeadline, setHaveDeadline ] = useState(false);
    var currentTime = new Date();
    const [ day, setDay ] = useState(currentTime.getDate());
    const [ month, setMonth ] = useState(currentTime.getMonth());
    const [ year, setYear ] = useState(currentTime.getFullYear());

    return(
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.header}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Dodaj zadanie</Text>
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.close()}>
                    <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            {/* - nazwa - */}
            <TextInput multiline={true} onChangeText={setName} value={name} style={[styles.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
            {/* - deadline - */}
            <TouchableOpacity style={[styles.button, {backgroundColor: themeID.colorButton1}]}>
                <Text style={[styles.font1, {color: themeID.colorText1}]}>Utwórz</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTaskMenu;