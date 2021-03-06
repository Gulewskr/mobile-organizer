import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import { DataContext } from '../data/DataContext';
import {getProfileSettings} from '../data/ProfileContext';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import DeadlineChanger from './deadlineChanger';

const TaskOptions = (props) => {

    //const { changeName, save, changeTaskProgress, removeTaskItem, getItemsTasks} = useContext(DataContext);
    const { changeName, changeStatus, deleteTask} = useContext(DataContext);
    const { endedTasks, setEndedTasks, notEndedTasks, setNotEndedTasks } = getProfileSettings();
    const { themeID } = useTheme();
  
    // Zmiana deadline
    const [ dVisibility, setDVisibility ] = useState(false);

    useEffect(() => {
        if(dVisibility){     
          console.log("zmiana deadline'u");
        }else{
          console.log("koniec zmiany deadline'u");
        }
      }, [dVisibility])

    try{
        if(props.task === undefined) return null;

        // Zmiana nazwy
        const [ accName, setAccName ] = useState( props.task.name);
        const [ taskName, onChangeName ] = useState( props.task.name);
        const [ editName,  allowEditName ] = useState( false );

        

        const setNewName = (changeOrReset) => {
            if(changeOrReset){
                changeName(props.id, taskName);
                setAccName(taskName);
            }
            else onChangeName(accName);
            allowEditName(false);
        };
    
        const close = () => {
            setNewName(false);
            props.close();
        };

        // Przycisk zakończ/kontynuuj zadanie
        const ChangeEndingState = () => {
            const [v, setV] = useState(false);
            
            const ConfirmButton = () => {
                const confirm = (bool) => {
                        if(bool){
                            if(props.task.ended){
                                setNotEndedTasks(notEndedTasks + 1);
                                setEndedTasks(endedTasks - 1);
                            }else{
                                setNotEndedTasks(notEndedTasks - 1);
                                setEndedTasks(endedTasks + 1);
                            }
                            changeStatus(props.id, !props.task.ended, props.task.connectedTask);
                        }
                        setV(false);
                };

                if(v){
                    return (
                    <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
                    <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorButton2}]}>
                        <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>{props.task.ended ? "Czy chcesz kontynuować zadanie?" : "Czy chcesz zakończyć zadanie?"}</Text>
                    <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                        <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                        <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
                        </TouchableOpacity>
                        <View style={{width: "15%"}}></View>
                        <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                            <Text style={[styles.ConfirmButtonText, { color: "#FE1010"}]} >Nie</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </TouchableOpacity>
                    );
                }else{
                    return null
                }
            };
         return (
            <>
            <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton2}]} onPress={() => setV(true)}>
            <Text style={{fontSize: 16, color: "#129403", alignSelf: "center"}}>{ props.task.ended ? "Kontynuuj zadanie" : "Zakończ zadanie" }</Text>
            </TouchableOpacity>
            <ConfirmButton />
            </>
         );
        };

        // Przycisk usunięcia zadania
        const RemoveTask = () => { 
            const [v, setV] = useState(false);
            const ConfirmButton = () => {
                const confirm = (bool) => {
                    if(bool){
                        deleteTask(props.id);
                        props.close();
                    }
                    setV(false);
                };

                if(v){
                    return (
                    <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
                    <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorButton2}]}>
                        <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>Czy chcesz usunąć zadanie?</Text>
                    <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                        <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                        <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
                        </TouchableOpacity>
                        <View style={{width: "15%"}}></View>
                        <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                            <Text style={[styles.ConfirmButtonText, {color: "#FE1010"}]} >Nie</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </TouchableOpacity>
                    );
                }else{
                    return null
                }
            };

            return (
                <>
                <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton2}]} onPress={() => setV(true)}>
                    <Text style={{fontSize: 16, color: "#FC0E0E", alignSelf: "center"}}>Usuń zadanie</Text>
                </TouchableOpacity>
                <ConfirmButton />
                </>
            );
        };

        return (
        <>
        <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
                {/* Zmiana nazwy */}
            <View style={styles2.optionsTextInputContainer}>
                <ScrollView style={styles2.optionsTextInput}>
                    <TextInput multiline={true} editable={editName} style={[styles2.optionsText, editName?{color: themeID.colorTextInput, backgroundColor: themeID.colorTextInputBackground} : {color: themeID.colorText1}]} onChangeText={onChangeName} value={ taskName } />
                </ScrollView>
                { editName ? 
                <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => { allowEditName(false); setNewName(true) }}>
                    <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.save} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { allowEditName(false); setNewName(false) }}>
                    <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.cross} />
                </TouchableOpacity>
                </View>
                :
                <TouchableOpacity onPress={() => { allowEditName(true) }}>
                    <Image style={[styles2.icon,{marginLeft: 5}]} source={icons.pen} />
                </TouchableOpacity>
                }
                </View>
                {/* Przycisk exit */}
                <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton2}]} onPress={() => close()}>
                <Image style={styles.exitButtonIcon} source={icons.cross} />
                </TouchableOpacity>
                {/* Edycja deadline */}
                <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton2}]} onPress={() => setDVisibility(true)}>
                <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Edytuj deadline</Text>
                </TouchableOpacity>
                {/* Przejście do szczegółów */}
                <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton2}]} onPress={() => {props.close(); props.navigation();}}>
                <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
                </TouchableOpacity>
                {/* Przycisk zakończ/kontynuuj zadanie */}
                <ChangeEndingState />
                {/* Przycik usuń zadanie */}
            <RemoveTask />
        </View>
        { dVisibility && <DeadlineChanger ids={props.id} day={props.task._day} month={props.task._month - 1} year={props.task._year} deadline={props.task.deadline} close={()=>setDVisibility(false)}/> }
        </>
        );
    }catch (err){
      console.log(err);
    }
    return null;
}

export default TaskOptions;