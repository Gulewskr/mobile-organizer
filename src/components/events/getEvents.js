import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import styles from '../../styles/deletePanelStyles';
import { useTheme } from '../../data/colors';
import { icons } from '../../components/icons';

import {DataContext} from '../../data/DataContext';

const EventMenu = () => {
    const { themeID } = useTheme();
    const [eventsF, setEventsF] = useState(null);
    const [eventsW, setEventsW] = useState(null);
    const [eventsM, setEventsM] = useState(null);

    const { getEventsByType } = useContext(DataContext);

    //funkcje --------------------------------------------------
    const checkDataThisMonth = (day) => {
        return (day >= new Date().getDate());
    }

    const GetMonthlyRepetetable = async() => {
        var thisMonth = [];
        var nextMonth = [];

        return await getEventsByType(2).then(
            (result) => {
                result.map((data,index) => {
                    if(checkDataThisMonth(data._day)){
                        thisMonth.push(data);
                    }else{
                        nextMonth.push(data);
                    }
                });
                thisMonth.push(nextMonth);
                return thisMonth;
            }
        );
    }

    const GetWeeklyRepetetable = async() => {
        var events = [];
        
        return await getEventsByType(1).then(
            (result) => {
                return result;
            }
        );
    }

    const checkDataFuture = (day, month, year) => {

        var currentTime = new Date();
        if(year > currentTime.getFullYear())
        {
            return true;
        }else if(year == currentTime.getFullYear()){
            if(month > currentTime.getMonth())
            {
                return true;
            }else if(month = currentTime.getMonth()){
                if(day >= currentTime.getDate())
                {
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    const GetFutureEvents = async() => {
        var nextEvents = [];
        return await getEventsByType(0).then(
            (result) => {
                result.map((data,index) => {
                        if(checkDataFuture(data._day, data._month, data._year)){
                            console.log("POG");
                            nextEvents.push(data);
                        }
                        console.log(data);
                    });
                    
                    return nextEvents;
            }
        );
    }
    //funkcje --------------------------------------------------



  useEffect(() => {
    GetFutureEvents().then((result)=> {setEventsF(result)});
    GetMonthlyRepetetable().then((result)=> {setEventsM(result)});
    GetWeeklyRepetetable().then((result)=> {setEventsW(result)});  
  }, []);

  const FutureEvents = () => {
    console.log(eventsF);
    
    return(
      <View><Text>Przyszłe wydarzenia</Text></View>
    );
  }

  const WeeklyEvents = () => {
    console.log(eventsW);
    
    return(
      <View><Text>Cotygodniowe wydarzenia</Text></View>
    );
  }

  const MonthlyEvents = () => {
    console.log(eventsM);
    
    return(
      <View><Text>Comiesięczne wydarzenia</Text></View>
    );
  }

    return(
        <>
            <FutureEvents />
            <WeeklyEvents />
            <MonthlyEvents />
        </>
    );
}

export default EventMenu