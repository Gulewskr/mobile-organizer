import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import { useTheme } from '../../data/colors';
import {DataContext} from '../../data/DataContext';

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import {eventControl} from '../../data/eventControler';
import {SectorMenu} from '../sectorHeader';
import {EventPanel} from '../events/eventPanel';

const ThisMonthEvents = (props) => {
    //props.month
    //props.year

    const { themeID } = useTheme();
    const { events } = useContext(DataContext);

    const [t, setT] = useState([]);

    useEffect(()=>{
        var t = [];
        t = eventControl.getEventsMonth(events, props.month, props.year);
        setT(t);
    },[events, props.month, props.year])

    var value = null;
    if(t.length > 0){
        value = events.map((data, index) => {
            return(
                <EventPanel key={index} data={data} delete={false} press={()=>{props.navigation.push('Event', {'id': data.id});}}/>
            );
          });
    }else{
        value = <Text>Brak zadań</Text>
    }

    return(
        <>
            <SectorMenu name={"Zadania " + nameOfMonths[props.month]}/>
            {value}
        </>
    );
}

export {ThisMonthEvents}
export default ThisMonthEvents