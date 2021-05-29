import React, { useState, useRef, useEffect, useContext } from 'react'
import {View, Text, Image, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native'
//import { TouchableOpacity} from 'react-native-gesture-handler'

import {Picker} from '@react-native-community/picker'

import {eventIcons} from '../../data/icons';
import DataEvent from './dataEventChanger';
import {WeeklyEventMenu, MothlyEventMenu, YearlyEventMenu} from './repetetableEvents';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleEventDate';
import styles2 from '../../styles/styles';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';

const EventIconPicker = (props) => {

    const { themeID } = useTheme();
    const [ iconID, setIconID ] = useState(props.icon);
    //menu wyboru ikony
    const [ menu, setMenu ] = useState(false);

    const settingIcon = (icon) =>
    {
        setIconID(icon);
        props.setIcon(icon);
    }

    return(
        <>
            <TouchableOpacity activeOpacity={1} style={styles.IconPicker} onPress={()=>{setMenu(true);}}>
                <Image style={styles.eventIcon} source={eventIcons[iconID]} />
                <View style={[styles.pickerIcon, {backgroundColor: themeID.colorButton1}]}>
                    <Image style={styles.pickerIconBrush} source={icons.brush} />
                </View>
            </TouchableOpacity>
            { menu &&
                <View style={[styles.iconChoseContainer, {backgroundColor: themeID.colorBackground}]}>
                    <View style={styles2.exitButtonContainer}>
                        <Text style={[styles.iconChoseContainerText,{color: themeID.colorText2}]}>Wybierz ikonę wydarzenia</Text>    
                        <TouchableOpacity   style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {setMenu(false)}}>
                            <Image style={styles2.exitButtonIcon} source={icons.cross} />
                        </TouchableOpacity  >
                    </View>
                    <View style={styles.iconEventIconRow}>
                        <TouchableOpacity style={styles.iconEventIcon} onPress={() => {setIconID(0)}}>
                            <Image style={styles.eventIcon} source={eventIcons[0]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles.iconEventIcon} onPress={() => {setIconID(1)}}>
                            <Image style={styles.eventIcon} source={eventIcons[1]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles.iconEventIcon} onPress={() => {setIconID(2)}}>
                            <Image style={styles.eventIcon} source={eventIcons[2]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconEventIconRow}>
                        <TouchableOpacity style={styles.iconEventIcon} onPress={() => {setIconID(3)}}>
                            <Image style={styles.eventIcon} source={eventIcons[3]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles.iconEventIcon} onPress={() => {setIconID(4)}}>
                            <Image style={styles.eventIcon} source={eventIcons[4]} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    );
}

export default EventIconPicker;