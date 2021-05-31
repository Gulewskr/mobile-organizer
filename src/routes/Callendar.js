import React, { useState } from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';
import {nameOfMonths, nameOfDays, numberOfDays} from '../data/calendar';

import {ThisMonthEvents} from '../components/lists/connectedEvents';
import {ThisMonthTasks} from '../components/lists/connectedTasks';
import styles2 from '../styles/callendarStyle';
import styles from '../styles/styles';
import {useTheme} from '../data/colors.js';

//day - numer dnia tygodnia
//number - dzień miesiąca
const calculateFirstDayOfMonth = (year, month) => {
  let day = new Date(year, month, 1).getDay()
  return day == 0 ? 7 : day;
}

const calculateDayOfMonth = (year, month) => {
  if(month == 1 && year % 4 == 0 && year % 100 != 0)
  {
    return 29;
  }
  return numberOfDays[month];
}


export default Callendar = ({navigation}) => {
  const { themeID } = useTheme();

  var currentTime = new Date();
  const [dayNumber, setDayNumber] = useState(0);
  const [month, setMonth] = useState(currentTime.getMonth());
  const [year, setYear] = useState(currentTime.getFullYear());
  const [firstDay, setFirstDay] = useState(calculateFirstDayOfMonth(year, month));

  const changeMonth = (month) => {
    if(month >= 0 && month < 12)
    {
      setMonth(month);
      setFirstDay(calculateFirstDayOfMonth(year, month));
    }else{
      if(month >= 0){
        setMonth(0);
        setYear(year + 1);
        setFirstDay(calculateFirstDayOfMonth(year + 1, 0));
      }else{
        setMonth(11);
        setYear(year - 1);
        setFirstDay(calculateFirstDayOfMonth(year - 1, 11));
      }
    }
  }

  const CallendarHeader = () => {
    return (
      <View style={[styles2.optionsHeader , {backgroundColor: themeID.colorHeader3}]}>
        <TouchableOpacity style={[styles2.optionsButton, {backgroundColor: themeID.colorButton1}]} onPress={() => changeMonth(month - 1) }>
          <Image style={styles2.optionsButtonIns}  source={icons.arrowLeft} />
        </TouchableOpacity>
        <Text style={[styles2.optionsText, {color: themeID.colorText1}]}>
          {nameOfMonths[month] + " " + year}
        </Text>
        <TouchableOpacity style={[styles2.optionsButton, {backgroundColor: themeID.colorButton1}]} onPress={() => changeMonth(month + 1) }>
          <Image style={styles2.optionsButtonIns}  source={icons.arrowRight} />
        </TouchableOpacity>
      </View>
    );
  };

  const MonthPage = () => {
    
    var daysTable = [];
    for(let i=0; i<7; i++)
    {
      daysTable[i] = [];
    }
    daysTable[0] = nameOfDays;
    let previousMonth = month - 1 >= 0 ? calculateDayOfMonth( year, month - 1) : calculateDayOfMonth( year - 1, 11);
    let thisMonth = calculateDayOfMonth(year, month);
    for(let i=firstDay-1; i >= 0; i--)
    {
      daysTable[1][i] = previousMonth - firstDay + i + 2;
    }
    for(let i=0; i < calculateDayOfMonth(year, month); i++)
    {
      daysTable[parseInt((firstDay - 1 + i)/7 + 1)][(firstDay - 1 + i) % 7 ] = i + 1;
    }
    for(let i=0;;i++)
    {
      if(parseInt((firstDay - 1 + thisMonth + i)/7 + 1) >= 7 ) break;
      daysTable[parseInt((firstDay - 1 + thisMonth + i)/7 + 1)][(firstDay - 1 + thisMonth + i) % 7 ] = i + 1;
    }

    var color = false;
    var back = true;
    const matrix = daysTable.map( (row, index) => {
      const id = index + 1;
      var value;
      if(index == 0)
      {
        value = row.map( (value, index) => {
          return (
            <Text key={id * index} style={[styles2.callendarHeaderCell, {color: themeID.colorText1}]}>
              {value}
            </Text>
          );
        });
        return (
          <View key={index} style={[styles2.callendarHeaderRow, {backgroundColor: themeID.colorHeader3}]}>
            {value}
          </View>
        );
      }else{
        value = row.map( (value, index) => {
          if(value == 1){ color = !color; back = false;}
          if(color)
            //<TouchableOpacity  key={id * index} style={[styles2.singleDay, {backgroundColor: themeID.colorCallendarDayA}]} onPress={()=> setDayNumber(value)}>
            return (
              <View  key={id * index} style={[styles2.singleDay, {backgroundColor: themeID.colorCallendarDayA}]}>
                <Text style={{color: themeID.colorTextDayA}}>
                  {value}
                </Text>
              </View>
            );
          else
              //<TouchableOpacity key={id * index} style={[styles2.singleDay, {backgroundColor: themeID.colorCallendarDayN}]} onPress={()=> { setDayNumber(value); if(value > 20) changeMonth(month - 1); else changeMonth(month + 1); }}>
              return (
              <View key={id * index} style={[styles2.singleDay, {backgroundColor: themeID.colorCallendarDayN}]}>
                <Text style={{color: themeID.colorTextDayN}}>
                  {value}
                </Text>
              </View>
            );
        });
      }
      return (
        <View key={index} style={styles2.callendarRow}>
          {value}
        </View>
      );
    });

    return (
      <View style={styles2.callendarMatrix}>
        {matrix}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
     <NavbarBack napis={'Kalendarz'} navigate={navigation} />
     <CallendarHeader />
     <MonthPage />
     <ScrollView style = {{marginTop: 10}}>
       <ThisMonthEvents navigation={navigation} month={month} year={year} />
       <ThisMonthTasks navigation={navigation} month={month} year={year} />
     </ScrollView>
    </View>
  );
};