import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import styles from '../../styles/deletePanelStyles';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';
import { eventControl } from './eventControler';

import {DataContext} from '../../data/DataContext';

/*
    wszystkie wydarzenia są jako events w dataContext i przekazywane z tamtąd
    klasa z funkcjami odpowiedzialnymi za przetentegowywanie danych związanych z listą eventów:
        -pobranie cotygodniowych
        -pobranie najbliższego tygodnia + przyszłych
        -pobranie z danego miesiąca
        -pobranie z danego dnia



*/

const EventMenu = (props) => {
    const { themeID } = useTheme();
    const [eventsFuture, setEventsFuture] = useState(null);
    const [eventsThisW, setEventsThisW] = useState(null);
    const [eventsWeekly, setEventsWeekly] = useState(null);

    const { events } = useContext(DataContext);
    
    const refreshEvents = (events) => {
        var eF, eW, eT;
        [eW, eF] = eventControl.nextWeekFuture(events);
        eT = eventControl.getWeeklyEvents(events);
        setEventsThisW(eW);
        setEventsFuture(eF);
        setEventsWeekly(eT);
    }

    useEffect(() => {
        refreshEvents(events);
    }, [events]);

    const MonthlyEvents = () => {
        //console.log("ten tydzień");
        //console.log(eventsThisW);
        
        return(
        <View><Text>Wydarzenia najbliższego tygodnia</Text></View>
        );
    }

    const FutureEvents = () => {
        //console.log("przyszłe");
        //console.log(eventsFuture);
        
        return(
        <View><Text>Dalsze wydarzenia</Text></View>
        );
    }

    const WeeklyEvents = () => {
        //console.log("cotygodniowe");
        //console.log(eventsWeekly);
        
        return(
        <View><Text>Cotygodniowe wydarzenia</Text></View>
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