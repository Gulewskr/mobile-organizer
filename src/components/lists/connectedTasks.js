import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import { useTheme } from '../../data/colors';
import {DataContext} from '../../data/DataContext';

import {nameOfMonths, nameOfDays, numberOfDays} from '../../data/calendar';
import {taskControl} from '../../data/tasksControler';
import {SectorMenu} from '../sectorHeader';
import Task from '../task';

const ConnectedTasks = (props) => {
    const { themeID } = useTheme();
    const { allTasks } = useContext(DataContext);

    const [t, setT] = useState([]);

    useEffect(()=>{
        var t = [];
        t = taskControl.getTaskForEvent(allTasks, props.id);
        setT(t);
    },[allTasks])

    var value = null;
    if(t.length > 0){
        value = t.map((data, index) => {
            return(
              <Task key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
                day={data._day} month={data._month} year={data._year} ended={data.ended} spec={data.spec} progress={data.endedP}
                press={() => { props.navigation.push('Task', {'id': data.id, 'name': data.name})}}/>
            );
          });
    }else{
        value = <Text>Brak powiązanych zadań</Text>
    }

    return(
        <>
            <SectorMenu name={"Powiązane zadania"}/>
            {value}
        </>
    );
}

const ThisMonthTasks = (props) => {
    const { themeID } = useTheme();
    const { allTasks } = useContext(DataContext);

    const [t, setT] = useState([]);

    useEffect(()=>{
        var t = [];
        t = taskControl.getTaskThisMonth(allTasks, props.month + 1, props.year);
        setT(t);
    },[allTasks, props.month, props.year])

    var value = null;
    if(t.length > 0){
        value = t.map((data, index) => {
            return(
              <Task key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
                day={data._day} month={data._month} year={data._year} ended={data.ended} spec={data.spec} progress={data.endedP}
                press={() => { props.navigation.push('Task', {'id': data.id, 'name': data.name})}}/>
            );
          });
    }else{
        value = <Text style={{color: themeID.colorText2}}>Brak zadań</Text>
    }

    return(
        <>
            <SectorMenu name={"Zadania " + nameOfMonths[props.month]}/>
            {value}
        </>
    );
}

export {ThisMonthTasks}
export default ConnectedTasks