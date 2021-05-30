import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import { useTheme } from '../../data/colors';
import {DataContext} from '../../data/DataContext';

import Note from '../note';
import {notesControl} from '../../data/notesControler';
import {SectorMenu} from '../sectorHeader';

const ConnectedNotesEvents = (props) => {
    const { themeID } = useTheme();
    const { notes } = useContext(DataContext);

    const [n, setN] = useState([]);

    useEffect(()=>{
        var d = notesControl.getNotesForEvent(notes, props.id);
        setN(d);
    },[notes])

    var value = null;
    if(n.length > 0){
        value = n.map((data, ind) => {
            return(
                <Note key={ind} data={data} press={() => {props.navigation.push('Note', {'id': data.id});}} />
            );
        })
    }else{
        value = <Text>Brak powiązanych notatek</Text>
    }

    return(
        <>
            <SectorMenu name={"Powiązane notatki"}/>
            {value}
        </>
    );
}

const ConnectedNotesTask = (props) => {
    const { themeID } = useTheme();
    const { notes } = useContext(DataContext);

    const [n, setN] = useState([]);

    useEffect(()=>{
        var d = notesControl.getNotesForTask(notes, props.id);
        setN(d);
    },[notes])

    var value = null;
    if(n.length > 0){
        value = n.map((data, ind) => {
            return(
                <Note key={ind} data={data} press={() => {props.navigation.push('Note', {'id': data.id});}} />
            );
        })
    }else{
        value = <Text>Brak powiązanych notatek</Text>
    }

    return(
        <>
            <SectorMenu name={"Powiązane notatki"}/>
            {value}
        </>
    );
}

export {ConnectedNotesTask, ConnectedNotesEvents}
export default ConnectedNotesEvents