import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import DataEvent from './dataEventChanger';
import {WeeklyEventMenu, MothlyEventMenu, YearlyEventMenu} from './repetetableEvents';
import {eventIcons} from '../../data/icons';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styles';
import styles3 from '../../styles/styleEventDate';
import styles4 from '../../styles/styleAddPanel';
import styles5 from '../../styles/stylesTask';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';


const EventOptions = (props) => {
    
    const { themeID } = useTheme();
    const { changeEventName, changeEventDate, changeEventDays, changeEventIcon, deleteEvent } = useContext(DataContext);

    const [name, setName] = useState(props.data.name);
    const [ editName,  allowEditName ] = useState( false );
    const [day, setDay] = useState(props.data._day);
    const [month, setMonth] = useState(props.data._month);
    const [year, setYear] = useState(props.data._year);
    
    const [type, setType] = useState(props.data.type);

    const [h, setH] = useState(props.data.hour);
    const [m, setM] = useState(props.data.minute);

    const [week, setWeek] = useState(props.data.dayWeek);
    const [changeData, setChangeData] = useState(false);

    const [icon, setIcon] = useState(props.data.icon);
    const [ iconA, setIconA ] = useState(false);

    const [d, setD] = useState(false);

    useEffect(() => {
        setName(props.data.name);
        allowEditName( false );
        setDay(props.data._day);
        setMonth(props.data._month);
        setYear(props.data._year);
        setType(props.data.type);
        setH(props.data.hour);
        setM(props.data.minute);
        setChangeData(false);
        setIcon(props.data.icon);
        setIconA(false);
        setWeek(props.data.dayWeek);
        setD(false);
    },[props.data]);

    useEffect(() => {
        changeEventIcon(props.data.id, icon)
    },[icon]);

    const changeName = (bool) => {
        if(bool){
            changeEventName(props.data.id, name);
        }else{
            setName(props.data.name);
        }
        allowEditName(false);
    }

    const changeDate = (bool) => {
        if(bool){
            changeEventDate(props.data.id, year, month, day, h, m);
        }else{
            setName(props.data.name);
        }
        setChangeData(false);
    }

    const changeWeek = (bool) => {
        if(bool){
            changeEventDays(props.data.id, week);
        }else{
            setWeek(props.data.dayWeek);
        }
        setChangeData(false);
    }

    const DeletePanel = () => {
        const confirm = (bool) => {
            if(bool){
                deleteEvent(props.data.id)
                props.close();
            }else{
                setD(false);
            }
        }
        return(
            <>
             <View style={[styles2.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
                  <Text style={[styles2.ConfirmButtonText, {color: themeID.colorText1}]}>Czy chcesz usunąć wydarzenie?</Text>
                  <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                      <TouchableOpacity style={[styles2.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => {confirm(true)}}>
                          <Text style={[styles2.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
                      </TouchableOpacity>
                      <View style={{width: "15%"}}></View>
                      <TouchableOpacity style={[styles2.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => {confirm(false)}}>
                          <Text style={[styles2.ConfirmButtonText, { color: "#FE1010"}]} >Nie</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            <TouchableOpacity style={styles2.fillRect} onPress={() => {confirm(false)}}/>
            </>
        );
    }

    const ConfirmReturnButtons = (props) => {
        return(
            <>
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.func(true);}}>
                <Text style={{color: themeID.colorText1}}>Potwierdź</Text>
            </TouchableOpacity>
            <View style={{height: 5}} />
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.func(false);}}>
                <Text style={{color: themeID.colorText1}}>Anuluj</Text>
            </TouchableOpacity>
            </>
        );
    }

    return (
        <View style={[styles3.addEventContainer, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles2.exitButtonContainer}>  
                <Text style={[styles.changerText,{color: themeID.colorText1}]}>Opcje wydarzenia</Text>    
                <TouchableOpacity style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.close()}}>
                    <Image style={styles2.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
            </View>
            <View style={{height: 15}} />
            <View style={{flexDirection: "row"}}>
                <View style={{width: "30%", alignItems:"center", zIndex: 10}}>
                    <TouchableOpacity activeOpacity={1} style={styles3.IconPicker} onPress={()=>{setIconA(true);}}>
                        <Image style={styles3.eventIcon} source={eventIcons[icon]} />
                        <View style={[styles3.pickerIcon, {backgroundColor: themeID.colorButton1}]}>
                            <Image style={styles3.pickerIconBrush} source={icons.brush} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width: "70%", height: 70, alignItems: "center", flexDirection:"row"}}>
                    <ScrollView>
                        <TextInput multiline={true} editable={editName} onChangeText={setName} value={name} style={[styles4.textNameInput, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} />
                    </ScrollView>
                    { editName ? 
                    <View>
                    <TouchableOpacity onPress={() => { allowEditName(false); changeName(true) }}>
                        <Image style={[styles5.icon,{marginLeft: 5}]} source={icons.save} />
                    </TouchableOpacity>
                    <View style={{height: 5}} />
                    <TouchableOpacity onPress={() => { allowEditName(false); changeName(false) }}>
                        <Image style={[styles5.icon,{marginLeft: 5}]} source={icons.cross} />
                    </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity onPress={() => { allowEditName(true) }}>
                        <Image style={[styles5.icon,{marginLeft: 5}]} source={icons.pen} />
                    </TouchableOpacity>
                    }
                </View>
            </View>
            { !iconA && changeData && type == 0 &&
                <>
                    <DataEvent day={day} setD={setDay} month={month} setM={setMonth} year={year} 
                        setY={setYear} hour={h} setH={setH} minutes={m} setMin={setM} />
                    <ConfirmReturnButtons func={changeDate} />
                </>
            }
            { !iconA && changeData && type == 1 &&
                <>
                    <WeeklyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} daily={week} setD={setWeek}/>
                    <ConfirmReturnButtons func={changeWeek} />
                </>
            }
            { !iconA && changeData && type == 2 &&
                <>
                    <MothlyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} day={day} setD={setDay} />
                    <ConfirmReturnButtons func={changeDate} />
                </>
            }
            { !iconA && changeData && type == 3 &&
                <>
                    <YearlyEventMenu hour={h} setH={setH} minutes={m} setMin={setM} day={day} setD={setDay} month={month} setM={setMonth}/>
                    <ConfirmReturnButtons func={changeDate} />
                </>
            }
            {   iconA && !changeData &&
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
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIcon(0); setIconA(false);}}>
                            <Image style={styles3.eventIcon} source={eventIcons[0]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIcon(1); setIconA(false);}}>
                            <Image style={styles3.eventIcon} source={eventIcons[1]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIcon(2); setIconA(false);}}>
                            <Image style={styles3.eventIcon} source={eventIcons[2]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles3.iconEventIconRow}>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIcon(3); setIconA(false);}}>
                            <Image style={styles3.eventIcon} source={eventIcons[3]} />
                        </TouchableOpacity>
                        <View style={{width: "5%"}}/>
                        <TouchableOpacity style={styles3.iconEventIcon} onPress={() => {setIcon(4); setIconA(false);}}>
                            <Image style={styles3.eventIcon} source={eventIcons[4]} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
            { !iconA && !changeData &&
            <>
                <View style={{height: 10}} />
                <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {setChangeData(true)}}>
                    <Text style={{color: themeID.colorText1}}>{type == 1 ? "Edytuj dni" : "Edytuj datę"}</Text>
                </TouchableOpacity>
                <View style={{height: 10}} />
                <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.navigation.push('Event', {'id': props.data.id}); props.close();}}>
                    <Text style={{color: themeID.colorText1}}>Wyświetl szczegóły</Text>
                </TouchableOpacity>
                <View style={{height: 10}} />
                <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {setD(true)}}>
                    <Text style={{color: "#FC0E0E"}}>Usuń wydarzenie</Text>
                </TouchableOpacity>
            </>
            }
            { d &&
                <DeletePanel />
            }
        </View>
    );
}

export default EventOptions;