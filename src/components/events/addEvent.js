import React, { useState, useRef, useEffect, useContext } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import DataEvent from './dataEventChanger';
import {WeeklyEventMenu, MothlyEventMenu, YearlyEventMenu} from './repetetableEvents';
import {eventIcons} from '../../data/icons';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styles';
import styles3 from '../../styles/styleEventDate';
import styles4 from '../../styles/styleAddPanel';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';

const AddingEventMenu = (props) => {

    const { addEvent } = useContext(DataContext);
    const { themeID } = useTheme();

    //nazwa
    const [ name, setName ] = useState("Wpisz nazwę");
    //typ wydarzenia:   0-jednorazowe 1-cotygodniowe 2-comiesięczne 3-coroczne
    const [ type, setType ] = useState(0);
    const [ iconA, setIconA ] = useState(false);
    //data
    const [ day, setDay ] = useState( (new Date).getDate() );
    const [ month, setMonth ] = useState( (new Date).getMonth() );
    const [ year, setYear ] = useState( (new Date).getFullYear() );
    const [ hour, setHour ] = useState( (new Date).getHours() );
    const [ minutes, setMinutes ] = useState( (new Date).getMinutes() );
    //dni powtarzania
    const [ daily, setDaily ] = useState("0000000");
    //ikona
    const [ iconID, setIconID ] = useState(0);

    const addEventToDB = () => {
        addEvent(name, type, year, month, day, daily, hour, minutes, iconID);
    }

    const TypePicker = () => {
        return(
        <View style={styles4.picker} >
            <Picker
                selectedValue={type} 
                onValueChange={(itemValue, itemIndex) => 
                    setType(itemValue)}>
                <Picker.Item useNativeAndroidPickerStyle={false} label={"jednorazowe"} value={0} />
                <Picker.Item useNativeAndroidPickerStyle={false} label={"cotygodniowe"} value={1} />
                <Picker.Item useNativeAndroidPickerStyle={false} label={"comiesięczne"} value={2} />
                <Picker.Item useNativeAndroidPickerStyle={false} label={"coroczne"} value={3} />
            </Picker>
        </View>);
    }

    return(
        <View style={[styles3.addEventContainer, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles2.exitButtonContainer}>
                <Text style={[styles.changerText,{color: themeID.colorText1}]}>Dodaj wydarzenie</Text>    
                <TouchableOpacity style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.close()}}>
                    <Image style={styles2.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row"}}>
                <View style={{width: "30%", alignItems:"center", zIndex: 10}}>
                    <TouchableOpacity activeOpacity={1} style={styles3.IconPicker} onPress={()=>{setIconA(true);}}>
                        <Image style={styles3.eventIcon} source={eventIcons[iconID]} />
                        <View style={[styles3.pickerIcon, {backgroundColor: themeID.colorButton1}]}>
                            <Image style={styles3.pickerIconBrush} source={icons.brush} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width: "70%", height: 70}}>
                    <ScrollView>
                        <TextInput multiline={true} onChangeText={setName} value={name} style={[styles4.textNameInput, {backgroundColor: themeID.colorTextInputBackground, color: themeID.colorTextInput}]} />
                    </ScrollView>
                </View>
            </View>
            { !iconA &&
            <View style={styles4.PickerRowWithText}>
                <Text style={[styles4.PickerRowWithTextText, {color: themeID.colorText1}]}>Typ</Text>
                <TypePicker />
            </View>}
            { !iconA && type == 0 &&
                <DataEvent day={day} setD={setDay} month={month} setM={setMonth} year={year} 
                    setY={setYear} hour={hour} setH={setHour} minutes={minutes} setMin={setMinutes} />
            }
            { !iconA && type == 1 &&
                <WeeklyEventMenu hour={hour} setH={setHour} minutes={minutes} setMin={setMinutes} daily={daily} setD={setDaily}/>
            }
            { !iconA && type == 2 &&
                <MothlyEventMenu hour={hour} setH={setHour} minutes={minutes} setMin={setMinutes} day={day} setD={setDay} />
            }
            { !iconA && type == 3 &&
                <YearlyEventMenu hour={hour} setH={setHour} minutes={minutes} setMin={setMinutes} day={day} setD={setDay} month={month} setM={setMonth}/>
            }
            {   iconA && 
                <View style={[styles3.iconChoseContainer, {backgroundColor: themeID.colorBackground}]}>
                    <View style={styles3.exitButtonContainer}>
                        <View style={{width: "80%"}}>
                            <Text style={[styles3.iconChoseContainerText,{color: themeID.colorText2}]}>Wybierz ikonę wydarzenia</Text>    
                        </View>
                        <View style={{width: "20%"}}>
                            <TouchableOpacity   style={[styles3.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {setIconA(false)}}>
                            <Image style={styles2.exitButtonIcon} source={icons.cross} />
                            </TouchableOpacity  >
                        </View>
                    </View>
                    <View style={styles3.iconEventIconRow}>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIconID(0)}}>
                            <Image style={styles3.eventIcon} source={eventIcons[0]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIconID(1)}}>
                            <Image style={styles3.eventIcon} source={eventIcons[1]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIconID(2)}}>
                            <Image style={styles3.eventIcon} source={eventIcons[2]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles3.iconEventIconRow}>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIconID(3)}}>
                            <Image style={styles3.eventIcon} source={eventIcons[3]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIconID(4)}}>
                            <Image style={styles3.eventIcon} source={eventIcons[4]} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {addEventToDB(); props.close();}}>
                <Text style={{color: themeID.colorText1}}>Potwierdź</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddingEventMenu;