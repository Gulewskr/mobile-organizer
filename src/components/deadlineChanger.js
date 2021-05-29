import React, { useState, useContext } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';
import {DataContext} from '../data/DataContext';
import styles from '../styles/styleDeadlineChanger';
import styles2 from '../styles/styles';
import styles3 from '../styles/styleAddPanel';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const DeadlineChanger = (props) => {

    const { changeDeadline } = useContext(DataContext);
    const { themeID } = useTheme();
    let currentTime = new Date();
    const [ day, setDay ] = useState(props.deadline? props.day : currentTime.getDate());
    const [ month, setMonth ] = useState(props.deadline? props.month : currentTime.getMonth());
    const [ year, setYear ] = useState(props.deadline? props.year : currentTime.getFullYear());
    const [ haveD, deadline ] = useState(props.deadline);

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
        changeDeadline(props.ids, haveD, day, month + 1, year); 
        props.close();
    }

    const ValueChanger = (props) => {
        return (
            <View style={styles.scrollChoose}>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickNext()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowUp} />
                </TouchableOpacity>
                <View style={styles.scrollList}>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.textCellBack}]}><Text style={{color: themeID.textCellText}}>{props.next}</Text></View>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>{props.value}</Text></View>
                    <View style={[styles.scrollChooseCell, {backgroundColor: themeID.textCellBack}]}><Text style={{color: themeID.textCellText}}>{props.prev}</Text></View>
                </View>
                <TouchableOpacity style={[styles.scrollChooseButton, {backgroundColor: themeID.colorButton1}]} onPress={() => props.clickPrev()}>
                    <Image style={styles.scrollChooseButtonIcon} source={icons.arrowDown} />
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <View style={[styles.changerContainer, {backgroundColor: themeID.colorContainer}]}>
            <Text style={[styles.changerText,{color: themeID.colorText1}]}>Wybierz deadline</Text>
            <TouchableOpacity style={[styles2.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => {props.close()}}>
                <Image style={styles2.exitButtonIcon} source={icons.cross} />
            </TouchableOpacity>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={[styles3.font2, {color: themeID.colorText1}]}>Deadline</Text>
                <TouchableOpacity style={[styles3.buttonIconMain,haveD ? {backgroundColor: themeID.colorButton1} : {backgroundColor: themeID.colorButtonUnchecked1}]}
                onPress={() => deadline(!haveD) }
                >
                    <Image style={[styles3.buttonIcon, haveD?{opacity:1}:{opacity:0.2}]} source={icons.checkmark} />
                </TouchableOpacity>
            </View>
            { 
            haveD ?
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={day}  next={nextDay()} prev={prevDay()} clickPrev={setPrevDay} clickNext={setNextDay}/>
                <ValueChanger value={nameOfMonths[month]}  next={nameOfMonths[nextMonth()]} prev={nameOfMonths[prevMonth()]} clickPrev={setPrevMonth} clickNext={setNextMonth}/>
                <ValueChanger value={year}  next={year + 1} prev={year - 1} clickPrev={setPrevYear} clickNext={setNextYear}/>
            </View>
            : null
            }
            <TouchableOpacity style={[styles.changerButton, {backgroundColor: themeID.colorButton1}]} onPress={() => saveValue()}>
                <Text style={{color: themeID.colorText1}}>Potwierdź</Text>
            </TouchableOpacity>
        </View>
    );
}

const DeadlineChooser = (props) => {

    const { changeDate } = useContext(DataContext);
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
        props.setDay(next);
    }

    const setPrevDay = () => {
        var prev = day - 1;
        if(prev < 1){
            prev = numberOfDays[month];
        }
        setDay(prev);
        props.setDay(prev);
    }

    const setNextMonth = () => {
        if(month + 1  >  11)
        {
            setMonth(0);
            props.setMonth(0);
            if(day > numberOfDays[0]){
                setDay(numberOfDays[0]);
            }
        }else{
            setMonth(month + 1);
            props.setMonth(month + 1);
            if(day > numberOfDays[month + 1]){
                setDay(numberOfDays[month + 1]);
                props.setDay(numberOfDays[month + 1]);
            }
        }
    }

    const setPrevMonth = () => {
        if(month - 1  >=  0)
        {
            setMonth(month - 1);
            props.setMonth(month - 1);
            if(day > numberOfDays[month - 1]) 
            {
                setDay(numberOfDays[month - 1]);
                props.setDay(numberOfDays[month - 1]);
            }
        }else{
            setMonth(11);
            props.setMonth(11);
            if(day > numberOfDays[11]){
                setDay(numberOfDays[11]);
                props.setDay(numberOfDays[11]);
            }
        }
    }

    const setNextYear = () => { 
        setYear(year + 1); 
        props.setYear(year + 1);
    }
    const setPrevYear = () => {
        setYear(year - 1); 
        props.setYear(year - 1);    
    }

    const ValueChanger = (props) => {
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
        <View style={{flexDirection: "row", width: "100%"}}>
            {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
            <ValueChanger value={day}  next={nextDay()} prev={prevDay()} clickPrev={setPrevDay} clickNext={setNextDay}/>
            <ValueChanger value={nameOfMonths[month]}  next={nameOfMonths[nextMonth()]} prev={nameOfMonths[prevMonth()]} clickPrev={setPrevMonth} clickNext={setNextMonth}/>
            <ValueChanger value={year}  next={year + 1} prev={year - 1} clickPrev={setPrevYear} clickNext={setNextYear}/>
        </View>
    );
}

export { DeadlineChooser };
export default DeadlineChanger;