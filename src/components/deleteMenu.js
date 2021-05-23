import React, { useState, useContext, useEffect } from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';

import styles from '../styles/deletePanelStyles';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import {DataContext} from '../data/DataContext';

import { TaskDelete } from '../components/task';


const DeleteMenu = (props) => {
    
    const { tasks, setTaskID, deleteTask} = useContext(DataContext);
    const { themeID } = useTheme();
    const [idToDelete, setIdToDelete ] = useState([]);

    useEffect(() => {
        setTaskID(props.id);
    }, [props.id])


    const addIDtoDelete = (value) => {
        let indexCopy = [...idToDelete];
        indexCopy.push(value);
        setIdToDelete(indexCopy);
    }

    const removeIDtoDelete = (value) => {
        let indexCopy = [...idToDelete];
        var id = indexCopy.indexOf(value);
        if(id != -1){
            indexCopy.splice(id, 1);
            setIdToDelete(indexCopy);
        }
    }

    const deleteT = () => {
        for(let i=0; i < idToDelete.length; i++)
        {
            deleteTask(idToDelete[i]);
        }
        setIdToDelete([]);
        props.close();
    }

    const canceled = () => {
        setIdToDelete([]);
        props.close();
    }


    var value = null;

    try{
        value = tasks.map((data, index) => {
            return(
                <TaskDelete key={data.id} index={data.id} nazwa={data.name} deadline={data.deadline} 
                day={data._day} month={data._month} year={data._year} ended={data.ended} spec={data.spec} progress={data.endedP}
                add={() => {addIDtoDelete(data.id)}} remove={() => {removeIDtoDelete(data.id)}}/>
            );
        });
    }catch(err){
      console.log(err);
    }
    return(
        <>
        <ScrollView style={{zIndex: 1, width: "100%"}}>
            {value}
            <View style={{marginBottom: 200}}/>
        </ScrollView>
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} style={[styles.button,{backgroundColor: "#008000"}]} 
            onPress={()=> {deleteT()}} >
                <Image source={icons.checkmark} style={styles.icon} />
            </TouchableOpacity>
            <View style={[styles.fontSq,{backgroundColor: themeID.colorButton1}]}>
                <Text style={[styles.font,{color: themeID.colorText1}]}>Usuwanie</Text> 
            </View>
            <TouchableOpacity activeOpacity={1} style={[styles.button,{backgroundColor: "#FF0000"}]} 
            onPress={()=> {canceled()}} >
                <Image source={icons.cross} style={styles.icon} />
            </TouchableOpacity>
        </View>
        </>
        );
}

export default DeleteMenu