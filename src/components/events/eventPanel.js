import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import { icons } from '../icons';
import {eventIcons} from '../../data/icons';
import styles from '../../styles/eventPanel';
import { useTheme } from '../../data/colors';

import {fullNamesOfDays, dataString} from '../../data/calendar';
import {dateCalculator} from '../../data/eventControler';

const getDayList = (days) =>
{
    var x = "";
    let id = 0;
    while( (id = days.indexOf('1', id)) != -1)
    {
        x += " " + fullNamesOfDays[id];
        id++;
    }
    return x
}

const getMinuteText = (minute) => 
{
    if(minute < 10)
    {
        return "0" + minute;
    }
    return minute;
}

const EventPanel = (props) => {
    const { themeID } = useTheme();
    const [ d, setD ] = useState(false);

    useEffect(()=>{
        setD(false);
    },[props.delete]);

    const type = props.data.type;

    var day =  props.data._day;
    var month =  props.data._month;
    var year =  props.data._year;

    var days = getDayList(props.data.dayWeek);

    var hour = props.data.hour;
    var minute = props.data.minute;


    if(type != 1)
    {
        switch(type){
            case 0:
                day =  props.data._day;
                month =  props.data._month;
                year =  props.data._year;
                break;
            case 2:
                day =  props.data._day;
                month =  dateCalculator.getMonthForMonthyEvent(day);
                year =  dateCalculator.getYearForYearlyEvent(month, day);
                break;
            case 3:
                day =  props.data._day;
                month =  props.data._month;
                year =  dateCalculator.getYearForYearlyEvent(month, day);
            break;
        }
    }else{
        day = 0;
        month = 0;
        year = 0;
    }

    return (
        <View style={[styles.container, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.headerRow}>
                <View style={{width: "22%", aspectRatio: 1, borderWidth: 1, borderRadius: 200}}>
                    <Image style={styles.eventIcon} source={eventIcons[props.data.icon]} />
                </View>
                <View style={{width: "3%"}} />
                <View style={{width: "70%"}}>
                    <Text style={[styles.nameFont, {color: themeID.colorText1}]}>
                        {props.data.name}
                    </Text>
                </View>
            </View>
            { type != 1 ?
            <View style={styles.singleRow}>
                <Text style={[styles.nameFont, {color: themeID.colorText1}]}>
                    Data: {dataString(day, month + 1, year)}
                </Text>
            </View>
            :
            <View style={styles.singleRow}>
                <Text style={[styles.nameFont, {color: themeID.colorText1}]}>
                    Dni: {days}
                </Text>
            </View>
            }
            <View style={styles.singleRow}>
                <Text style={[styles.nameFont, {color: themeID.colorText1}]}>
                    Godzina: {hour}:{getMinuteText(minute)}
                </Text>
            </View>
            { !props.delete ?
            <TouchableOpacity style={[styles.moreButton, {backgroundColor: themeID.colorButton1}]}
                onPress={()=>props.press()}>
                <Image style={styles.moreIcon} source={icons.dots} />
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.moreButton, d? {backgroundColor: themeID.colorButton1}:{backgroundColor: themeID.colorButtonUnchecked1}]}
                onPress={()=>{d? setD(false):setD(true);  d? props.pressRem() : props.pressADD()}}>
                <Image style={[styles.moreIcon, d?{opacity: 1}:{opacity: 0.4}]} source={icons.trash} />
            </TouchableOpacity>
            }
        </View >
    );
}

const EventPanelDelete = (props) => {
    const { themeID } = useTheme();
    return (
        <View style={[styles.taskContainer, {backgroundColor: themeID.colorContainer}]}>
            <Text>Do usunięcia wydarzenia: {props.data.name}</Text>
        </View >
    );
}

export { EventPanel, EventPanelDelete, getMinuteText }