import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import styles from '../../styles/deletePanelStyles';
import { useTheme } from '../../data/colors';
import { icons } from '../icons';
import { eventControl } from '../../data/eventControler';
import { EventPanel, EventPanelDelete } from './eventPanel';
import {DataContext} from '../../data/DataContext';

import {SectorMenu} from '../sectorHeader';

const EventMenu = (props) => {
    const { themeID } = useTheme();
    const [eventsFuture, setEventsFuture] = useState(null);
    const [eventsThisW, setEventsThisW] = useState(null);
    const [eventsWeekly, setEventsWeekly] = useState(null);

    const { events } = useContext(DataContext);
    
    const refreshEvents = (events) => {
        var eF = null;
        var eW = null;
        var eT = null;
        [eW, eF] = eventControl.nextWeekFuture(events);
        eT = eventControl.getWeeklyEvents(events);
        setEventsThisW(eW);
        setEventsFuture(eF);
        setEventsWeekly(eT);
    }

    useEffect(() => {
        refreshEvents(events);
    }, [events]);

    const NextWeekEvents = () => {
        //console.log(eventsThisW);
        var value = null;
        if(Array.isArray(eventsThisW))
        {
            value = eventsThisW.map((data, index) => {
                if(!props.remove){
                    return(
                        <EventPanel key={index} data={data} delete={false} press={()=>{props.optionID(data); props.option(true);}}/>
                    );
                }
                else{
                    return(
                        <EventPanel key={index} data={data} delete={true} pressADD={()=>{props.removeAdd(data.id)}} pressRem={()=>{props.removeDel(data.id);}}/>
                    );
                }
            })
        }

        return(
        <>
            <SectorMenu name={"Wydarzenia najbliższego tygodnia"}/>
            {value}
        </>
        );
    }

    const FutureEvents = () => {
        //console.log(eventsFuture);
        var value = null;
        if(Array.isArray(eventsFuture))
        {
            value = eventsFuture.map((data, index) => {
                if(!props.remove){
                    return(
                        <EventPanel key={index} data={data} delete={false} press={()=>{props.optionID(data); props.option(true);}}/>
                    );
                }
                else{
                    return(
                        <EventPanel key={index} data={data} delete={true} pressADD={()=>{props.removeAdd(data.id)}} pressRem={()=>{props.removeDel(data.id);}}/>
                    );
                }
            })
        }

        return(
        <>
            <SectorMenu name={"Dalsze wydarzenia"}/>
            {value}
        </>
        );
    }

    const WeeklyEvents = () => {
        //console.log(eventsWeekly);
        var value = null;
        if(Array.isArray(eventsWeekly))
        {
            value = eventsWeekly.map((data, index) => {
                if(!props.remove){
                    return(
                        <EventPanel key={index} data={data} delete={false} press={()=>{props.optionID(data); props.option(true);}}/>
                    );
                }
                else{
                    return(
                        <EventPanel key={index} data={data} delete={true} pressADD={()=>{props.removeAdd(data.id)}} pressRem={()=>{props.removeDel(data.id);}}/>
                    );
                }
            })
        }

        return(
        <>
            <SectorMenu name={"Cotygodniowe wydarzenia"}/>
            {value}
        </>
        );
    }

    return(
        <>
            <NextWeekEvents />
            <WeeklyEvents />
            <FutureEvents />
        </>
    );
}

export default EventMenu