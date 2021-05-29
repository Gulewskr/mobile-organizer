import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styles';
import styles3 from '../../styles/styleAddPanel';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';

const AddingEventMenu = (props) => {

    const currentTime = new Date;
    const { themeID } = useTheme();

    //data
    const [ day, setDay ] = useState( props.day );
    const [ month, setMonth ] = useState( props.month );
    const [ year, setYear ] = useState( props.year );

    //blokada na date
    const [ dayB, setDayB ] = useState(false);
    const [ monthB, setMonthB ] = useState(false);
    const [ yearB, setYearB ] = useState(false);
    const [ hourB, setHourB ] = useState(false);
    const [ minuteB, setMinuteB ] = useState(false);

    const [hour, setHour] = useState(props.hour)
    const [minutes,setMinutes] = useState(props.minutes);
    
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

    const reffreshingBlock = () => {
        if(yearB){
            if(monthB){
                if(dayB){
                    if(hourB){
                        if(minutes <= currentTime.getMinutes())
                        {
                            setMinuteB(true);
                            settingMinutes(currentTime.getMinutes());
                        }
                    }else{
                        if(hour <= currentTime.getHours())
                        {
                            setHourB(true);
                            settingHour(currentTime.getHours());
                            reffreshingBlock();
                        }else{
                            setMinuteB(false);
                        }
                    }
                }else{
                    if(day <= currentTime.getDate())
                    {
                        setDayB(true);
                        settingD(currentTime.getDate());
                        reffreshingBlock();
                    }else{
                        setHourB(false);
                        setMinuteB(false);
                    }
                }
            }else{
                if(month <= currentTime.getMonth())
                {
                    setMonthB(true);
                    settingM(currentTime.getMonth());
                    reffreshingBlock();
                }else{
                    setDayB(false);
                    setHourB(false);
                    setMinuteB(false);
                }
            }
        }else{
            setMonthB(false);
            setDayB(false);
            setHourB(false);
            setMinuteB(false);
        }
    }

    const nextDay = () => {
        var next = day + 1;
        setDayB(false);
        if(next > numberOfDays[month])
        {
            next = 1;
            nextMonth();
        }
        settingD(next);
        reffreshingBlock();
    }

    const prevDay = () => {
        var prev = day - 1;
        if(prev > currentTime.getDate())
        {
            settingD(prev);
        }else{
            if(monthB){
                setDayB(true);
                reffreshingBlock();
                settingD(currentTime.getDate());
            }else{
                if(prev < 1){
                    prev = numberOfDays[prevMonth()];
                }
                settingD(prev);
            }
        } 
    }

    const nextMonth = () => {
        setMonthB(false);
        var m = month + 1;
        if(m > 11){
            m = 0;
            nextYear();
        }
        settingM(m);
        reffreshingBlock();
    }

    const prevMonth = () => {
        var m = month - 1;
        if(m <= currentTime.getMonth())
        {
            if(yearB){
                setMonthB(true);
                reffreshingBlock();
                m  = currentTime.getMonth();
            }else{
                if(m < 0){
                    prevYear();
                    m = 11;
                }
            }
        }
        settingM(m);
    }

    const prevYear = () => {
        var y = year - 1;
        if(y <= currentTime.getFullYear()){
            setYearB(true);
            reffreshingBlock();
            y = currentTime.getFullYear();
        }
        settingY(y);
    }

    const nextYear = () => {
        setYearB(false);
        settingY(year + 1);
        reffreshingBlock();
    }

    const prevHour = () => {
        var h = hour - 1;
        if(dayB)
        {
            if(h <= currentTime.getHours())
            {
                h = currentTime.getHours();
            }
        }else{
            if(h < 0){
                prevDay();
                h = 23;
            }
        }
        settingHour(h);
    }

    const nextHour = () => {
        var h = hour + 1;
        setHourB(false);
        if(h > 23){
            nextDay();
            h = 0;
        }
        settingHour(h);
        reffreshingBlock();
    }

    const prevMinute = () => {
        var m = minutes - 1;
        if(hourB)
        {
            if(m <= currentTime.getMinutes())
            {
                m = currentTime.getMinutes();
            }
        }else{
            if(m < 0){
                prevHour();
                m = 59;
            }
        }
        settingMinutes(m);
    }

    const nextMinute = () => {
        var m = minutes + 1;
        setMinuteB(false);
        if(m > 60){
            nextHour();
            m = 0;
        }
        settingMinutes(m);
    }

    const ValueChanger = (props) => {
        return (
            <View style={styles.scrollChoose}>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickPrev()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowUp} />
                </TouchableOpacity>
                <View style={styles.scrollList}>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>{props.value}</Text></View>
                </View>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickNext()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowDown} />
                </TouchableOpacity>
            </View>
        );
    }

    //TODO tutaj same zmienianie daty zrobić a kontyner oddzielnie jest
    //TODO zmiena styli (większe widoki)
    return(
        <>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={day} clickPrev={prevDay} clickNext={nextDay}/>
                <ValueChanger value={nameOfMonths[month]}  clickPrev={prevMonth} clickNext={nextMonth}/>
                <ValueChanger value={year}  clickPrev={prevYear} clickNext={nextYear}/>
            </View>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={hour} clickPrev={prevHour} clickNext={nextHour}/>
                <ValueChanger value={minutes}  clickPrev={prevMinute} clickNext={nextMinute}/>
            </View>
        </>
    );
}

export default AddingEventMenu;