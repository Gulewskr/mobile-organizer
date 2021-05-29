import React, { useState, useRef, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import DataEvent from './dataEventChanger';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styles';
import styles3 from '../../styles/styleAddPanel';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';

const AddingEventMenu = (props) => {

    //TODO dokończyć menu dodawania 
    const { addEvent } = useContext(DataContext);
    const { themeID } = useTheme();

    //nazwa
    const [ name, setName ] = useState("Wpisz nazwę");

    //data
    const [ day, setDay ] = useState( (new Date).getDate() );
    const [ month, setMonth ] = useState( (new Date).getMonth() );
    const [ year, setYear ] = useState( (new Date).getFullYear() );
    const [ hour, setHour ] = useState( (new Date).getHours() );
    const [ minutes, setMinutes ] = useState( (new Date).getMinutes() );
    
    const addEventToDB = () => {
        addEvent( /* TODO jakieś zmienne */ )
    }

    //TODO tutaj dokończyć kontyner
    //menu wyboru typu wydarzenia: jednorazowe, tygodniowe, miesięczne
    //edycja nazwy
    //menu wyboru ikony
    //TODO zmienić w bazie danych żeby było id ikony
    //
    return(
        <View style={[styles.changerContainer, {backgroundColor: themeID.colorContainer}]}>
            <Text style={[styles.changerText,{color: themeID.colorText1}]}>Dodaj wydarzenie</Text>
            <TouchableOpacity style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.close()}}>
                <Image style={styles2.exitButtonIcon} source={icons.cross} />
            </TouchableOpacity>
            <DataEvent day={day} setD={setDay} month={month} setM={setMonth} year={year} 
                setY={setYear} hour={hour} setH={setHour} minutes={minutes} setMin={setMinutes} />
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => addEventToDB()}>
                <Text style={{color: themeID.colorText1}}>Potwierdź</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddingEventMenu;