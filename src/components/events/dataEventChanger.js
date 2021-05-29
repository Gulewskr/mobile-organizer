import React, { useState, useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styleEventDate';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';

const AddingEventMenu = (props) => {

    const currentTime = new Date;
    const { themeID } = useTheme();

    //data
    const [ day, setDay ] = useState( props.day );
    const [ month, setMonth ] = useState( props.month );
    const [ year, setYear ] = useState( props.year );
    const [hour, setHour] = useState(props.hour)
    const [minutes,setMinutes] = useState(props.minutes);
    
    useEffect(() => {
        if(day > numberOfDays[month])
            settingD(numberOfDays[month]);
    }, [month]);

    const settingMinutes = (m) => {
        setMinutes(m);
        props.setMin(m);
    }
    const settingHour = (h) => {
        setHour(h);
        props.setH(h);
    }
    const settingD = (d) => {
        setDay(d);
        props.setD(d);
    }
    const settingM = (d) => {
        setMonth(d);
        props.setM(d);
    }
    const settingY = (d) => {
        setYear(d);
        props.setY(d);
    }
    const nextDay = () => {
        var next = day + 1;
        if(next > numberOfDays[month])
        {
            next = 1;
        }
        settingD(next);
    }
    const prevDay = () => {
        var prev = day - 1;
        if(prev < 1){
            prev = numberOfDays[month];
        } 
        settingD(prev);
    }
    const nextMonth = () => {
        var m = month + 1;
        if(m > 11){
            m = 0;
        }
        settingM(m);
    }
    const prevMonth = () => {
        var m = month - 1;
        if(m < 0){
            m = 11;
        }
        settingM(m);
    }
    const prevYear = () => {
        var y = year - 1;
        if(y <= currentTime.getFullYear()){
            y = currentTime.getFullYear();
        }
        settingY(y);
    }
    const nextYear = () => {
        settingY(year + 1);
    }
    const prevHour = () => {
        var h = hour - 1;
        if(h < 0){
            h = 23;
        }
        settingHour(h);
    }
    const nextHour = () => {
        var h = hour + 1;
        if(h > 23){
            h = 0;
        }
        settingHour(h);
    }
    const prevMinute = () => {
        var m = minutes - 1;
        if(m < 0){ m = 59; }
        settingMinutes(m);
    }
    const nextMinute = () => {
        var m = minutes + 1;
        if(m > 59){ m = 0; }
        settingMinutes(m);
    }

    const ValueChanger = (props) => {
        return (
            <View style={styles2.scrollChoose}>
                <TouchableOpacity style={[styles2.scrollChooseButton, styles2.scrollChooseButtonUP, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickNext()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowUp} />
                </TouchableOpacity>
                <View style={[styles2.scrollChooseCell, props.s, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>{props.value}</Text></View>
                <TouchableOpacity style={[styles2.scrollChooseButton, styles2.scrollChooseButtonDown,{backgroundColor: themeID.colorButton1}]} onPress={() => props.clickPrev()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowDown} />
                </TouchableOpacity>
            </View>
        );
    }

    //TODO tutaj same zmienianie daty zrobić a kontyner oddzielnie jest
    //TODO zmiena styli (większe widoki)
    return(
        <View style={[styles2.dataChangeContainer, {backgroundColor: themeID.colorBackground}]}>
            <Text style={[styles.changerText,{color: themeID.colorText2}]}>Wybierz dzień</Text>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={day} clickPrev={prevDay} clickNext={nextDay}/>
                <View style={{width: 5}} />
                <ValueChanger value={nameOfMonths[month]}  clickPrev={prevMonth} clickNext={nextMonth}/>
                <View style={{width: 5}} />
                <ValueChanger value={year}  clickPrev={prevYear} clickNext={nextYear}/>
            </View>
            <Text style={[styles.changerText,{color: themeID.colorText2}]}>Wybierz godzinę</Text>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={hour} clickPrev={prevHour} clickNext={nextHour} s={styles2.scrollChooseCellLeft}/>
                <View style={[styles2.timeSplitter, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>:</Text></View>
                <ValueChanger value={minutes}  clickPrev={prevMinute} clickNext={nextMinute} s={styles2.scrollChooseCellRight}/>
            </View>
        </View>
    );
}

export default AddingEventMenu;