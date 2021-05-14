import React, { useState } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import styles from '../styles/styleDeadlineChanger';
import styles2 from '../styles/styles';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const DeadlineChanger = (props) => {

    const { themeID } = useTheme();
    const [ day, setDay ] = useState(props.day);
    const [ month, setMonth ] = useState(props.month);
    const [ year, setYear ] = useState(props.year);

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const nextDay = () => {
        var next = day + 1;
        var max = numberOfDays[month];
        if(next > max) next = 1;
        return next;
    }

    const prevDay = () => {
        var prev = day - 1;
        if(prev < 1){
            prev = numberOfDays[month];
        }
        return prev;
    }

    const nextMonth = () => {
        return month + 1  >  11 ? 0 : month + 1;
    }

    const prevMonth = () => {
        return month - 1  >=  0 ? month - 1 : 11;
    }

    const setNextDay = () => {
        var next = day + 1;
        var max = numberOfDays[month];
        if(next > max) next = 1;
        setDay(next);
    }

    const setPrevDay = () => {
        var prev = day - 1;
        if(prev < 1){
            prev = numberOfDays[month];
        }
        setDay(prev);
    }

    const setNextMonth = () => {
        if(month + 1  >  11)
        {
            setMonth(0);
            if(day > numberOfDays[0]) setDay(numberOfDays[0]);
        }else{
            setMonth(month + 1);
            if(day > numberOfDays[month + 1]) setDay(numberOfDays[month + 1]);
        }
    }

    const setPrevMonth = () => {
        if(month - 1  >=  0)
        {
            setMonth(month - 1);
            if(day > numberOfDays[month - 1]) setDay(numberOfDays[month - 1]);
        }else{
            setMonth(11);
            if(day > numberOfDays[11]) setDay(numberOfDays[11]);
        }
    }

    const setNextYear = () => { setYear(year + 1); }
    const setPrevYear = () => { setYear(year - 1); }

    const saveValue = () => {
        //day, month, year
        return 0; 
    } 

    const scrollableDays = () => {

    }

    const scrollableMonth = () => {
        
    }

    const scrollableYear = () => {
        
    }

    const ValueChanger = (props) => {
        const [ active, setActive ] = useState(false);

        return (
            <View style={styles.scrollChoose}>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickPrev()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowUp} />
                </TouchableOpacity>
                <View style={styles.scrollList}>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.textCellBack}]}><Text style={{color: themeID.textCellText}}>{props.prev}</Text></View>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>{props.value}</Text></View>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.textCellBack}]}><Text style={{color: themeID.textCellText}}>{props.next}</Text></View>
                </View>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickNext()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowDown} />
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={[styles.changerContainer, {backgroundColor: themeID.colorContainer}]}>
            <Text style={styles.changerText}>Wybierz deadline*</Text>
            <TouchableOpacity style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.close(false)}}>
                <Image style={styles2.exitButtonIcon} source={icons.cross} />
            </TouchableOpacity>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={day}  next={nextDay()} prev={prevDay()} clickPrev={setPrevDay} clickNext={setNextDay}/>
                <ValueChanger value={nameOfMonths[month]}  next={nameOfMonths[nextMonth()]} prev={nameOfMonths[prevMonth()]} clickPrev={setPrevMonth} clickNext={setNextMonth}/>
                <ValueChanger value={year}  next={year + 1} prev={year - 1} clickPrev={setPrevYear} clickNext={setNextYear}/>
            </View>
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]}>
                <Text>Potwierdź</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DeadlineChanger;