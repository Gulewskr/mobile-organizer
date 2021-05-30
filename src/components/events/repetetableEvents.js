import React, { useState, useContext, useEffect } from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import {DataContext} from '../../data/DataContext';
import styles from '../../styles/styleDeadlineChanger';
import styles2 from '../../styles/styleEventDate';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';


const ValueChanger = (props) => {
    const { themeID } = useTheme();
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

const SingleDay = (props) => {
    const { themeID } = useTheme();
    return(
        <>
        <TouchableOpacity style={[styles2.singleDayButton, props.c ? {backgroundColor:themeID.colorButton1} : {backgroundColor:themeID.colorButtonUnchecked1}]} onPress={()=>{props.setC(!props.c)}}>
            <Text>{props.v}</Text>
        </TouchableOpacity>
        </>
    );
}

const WeeklyEventMenu = (props) => {

    const { themeID } = useTheme();

    //wybór dla każdego dnia
    const [mon, setMon] = useState((String)(props.daily).charAt(0) == 1);
    const [tue, setTue] = useState((String)(props.daily).charAt(1) == 1);
    const [wed, setWed] = useState((String)(props.daily).charAt(2) == 1);
    const [thr, setThr] = useState((String)(props.daily).charAt(3) == 1);
    const [fri, setFri] = useState((String)(props.daily).charAt(4) == 1);
    const [sat, setSat] = useState((String)(props.daily).charAt(5) == 1);
    const [sun, setSun] = useState((String)(props.daily).charAt(6) == 1);
    //godzina wydarzenia
    const [hour, setHour] = useState(props.hour)
    const [minutes,setMinutes] = useState(props.minutes);

    //ustwia date do bazy danych
    const setDaily = () => {
        var daily = "";
        mon ? daily += "1" : daily += "0"; 
        tue ? daily += "1" : daily += "0"; 
        wed ? daily += "1" : daily += "0"; 
        thr ? daily += "1" : daily += "0"; 
        fri ? daily += "1" : daily += "0"; 
        sat ? daily += "1" : daily += "0"; 
        sun ? daily += "1" : daily += "0"; 
        props.setD(daily);
    }

    useEffect(() => {
        setDaily(); 
    }, [mon, tue, wed, thr, fri, sat, sun]);

    const settingMinutes = (m) => {
        setMinutes(m);
        props.setMin(m);
    }
    const settingHour = (h) => {
        setHour(h);
        props.setH(h);
    }
    const prevHour = () => {
        var h = hour - 1;
        if(h < 0){ h = 23; }
        settingHour(h);
    }
    const nextHour = () => {
        var h = hour + 1;
        if(h > 23){ h = 0; }
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

    const WeekTable = () => {
        return(
            <View style={{flexDirection:"row"}}>
                <SingleDay c={mon} setC={setMon} v={"Pon"} />
                <SingleDay c={tue} setC={setTue} v={"Wto"} />
                <SingleDay c={wed} setC={setWed} v={"Śrd"} />
                <SingleDay c={thr} setC={setThr} v={"Czw"} />
                <SingleDay c={fri} setC={setFri} v={"Pią"} />
                <SingleDay c={sat} setC={setSat} v={"Sob"} />
                <SingleDay c={sun} setC={setSun} v={"Nie"} />
            </View>
        );
    }

    return(
        <View style={[styles2.dataChangeContainer, {backgroundColor: themeID.colorBackground}]}>
            <Text style={[styles.changerText,{color: themeID.colorText2}]}>Wybierz dni</Text>
            <WeekTable />
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

const MothlyEventMenu = (props) => {
    const { themeID } = useTheme();
    //dzień
    const [ day, setDay ] = useState(props.day);
    //godzina wydarzenia
    const [hour, setHour] = useState(props.hour);
    const [minutes,setMinutes] = useState(props.minutes);

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
    const prevHour = () => {
        var h = hour - 1;
        if(h < 0){ h = 23; }
        settingHour(h);
    }
    const nextHour = () => {
        var h = hour + 1;
        if(h > 23){ h = 0; }
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
    const nextDay = () => {
        var next = day + 1;
        if(next > 31){ next = 1; }
        settingD(next);
    }
    const prevDay = () => {
        var prev = day - 1;
        if(prev < 1){ prev = 31; }
        settingD(prev);
    }

    return(
        <View style={[styles2.dataChangeContainer, {backgroundColor: themeID.colorBackground}]}>
            <Text style={[styles.changerText,{color: themeID.colorText2}]}>Wybierz dzień i godzinę</Text>
            <View style={{flexDirection: "row"}}>
                {/* tablica se zrob elementy które będą potem jako menu i se będziesz tak chop siup góra dół */}
                <ValueChanger value={day > 28 ? day + "!" : day} clickPrev={prevDay} clickNext={nextDay}/>
                <View style={{width: 5}} />
                <ValueChanger value={hour} clickPrev={prevHour} clickNext={nextHour} s={styles2.scrollChooseCellLeft}/>
                <View style={[styles2.timeSplitter, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>:</Text></View>
                <ValueChanger value={minutes}  clickPrev={prevMinute} clickNext={nextMinute} s={styles2.scrollChooseCellRight}/>
            </View>
        </View>
    );
}

const YearlyEventMenu = (props) => {
    const { themeID } = useTheme();
    //dzień i miesiąc
    const [ day, setDay ] = useState(props.day);
    const [ month, setMonth ] = useState( props.month );
    //godzina wydarzenia
    const [hour, setHour] = useState(props.hour);
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
    const prevHour = () => {
        var h = hour - 1;
        if(h < 0){ h = 23; }
        settingHour(h);
    }
    const nextHour = () => {
        var h = hour + 1;
        if(h > 23){ h = 0; }
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
    const nextDay = () => {
        var next = day + 1;
        if(next > 31){ next = 1; }
        settingD(next);
    }
    const prevDay = () => {
        var prev = day - 1;
        if(prev < 1){ prev = 31; }
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

    return(
        <View style={[styles2.dataChangeContainer, {backgroundColor: themeID.colorBackground}]}>
            <Text style={[styles.changerText,{color: themeID.colorText2}]}>Wybierz datę i godzinę</Text>
            <View style={{flexDirection: "row"}}>
                <ValueChanger value={day} clickPrev={prevDay} clickNext={nextDay}/>
                <View style={{width: 5}} />
                <ValueChanger value={nameOfMonths[month]}  clickPrev={prevMonth} clickNext={nextMonth}/>
            </View>
            <View style={{flexDirection: "row"}}>
                <ValueChanger value={hour} clickPrev={prevHour} clickNext={nextHour} s={styles2.scrollChooseCellLeft}/>
                <View style={[styles2.timeSplitter, {backgroundColor: themeID.colorHeader3}]}><Text style={{color: themeID.textCellText}}>:</Text></View>
                <ValueChanger value={minutes}  clickPrev={prevMinute} clickNext={nextMinute} s={styles2.scrollChooseCellRight}/>
            </View>
        </View>
    );
}

export {WeeklyEventMenu, MothlyEventMenu, YearlyEventMenu};