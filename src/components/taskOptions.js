import React, { useState, useContext } from 'react'
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';

import { DataContext } from '../data/DataContext';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

const TaskOptions = (props) => {

    const { changeName, save, changeTaskProgress, removeTaskItem, getItemsTasks} = useContext(DataContext);
    const { themeID } = useTheme();

    //props.ids - indeksy do zadania
    //props.show - ustawienie widzialności true/false

    //task - aktualne zadanie
    const task = getItemsTasks(props.ids);

    try{
        if(task === undefined) return null;
        
        // Zmiana nazwy
        const [ taskName, onChangeName ] = useState( task.name );
        const [ editName,  allowEditName ] = useState(false);

        const setNewName = (changeOrReset) => {
            if(changeOrReset){
                changeName(props.ids, taskName);
            }
            else onChangeName(task.name);
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
                            changeTaskProgress(props.ids);
                        }
                        setV(false);
                };

                if(v){
                    return (
                    <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
                    <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
                        <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>{task.ended ? "Czy chcesz kontynuować zadanie?" : "Czy chcesz zakończyć zadanie?"}</Text>
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
            <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => setV(true)}>
            <Text style={{fontSize: 16, color: "#129403", alignSelf: "center"}}>{ task.ended ? "Kontynuuj zadanie" : "Zakończ zadanie" }</Text>
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
                        removeTaskItem(props.ids);
                        props.show(false);
                    }
                    setV(false);
                };

                if(v){
                    return (
                    <TouchableOpacity style={styles.fillRect} onPress={()=>setV(false)}>
                    <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
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
                <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => setV(true)}>
                    <Text style={{fontSize: 16, color: "#FC0E0E", alignSelf: "center"}}>Usuń zadanie</Text>
                </TouchableOpacity>
                <ConfirmButton />
                </>
            );
        };

        return (
        <View style={[styles2.optionContainerInside, {backgroundColor: themeID.colorContainer}]}>
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
            <TouchableOpacity style={[styles.exitButton, {backgroundColor: themeID.colorButton1}]} onPress={() => close()}>
            <Image style={styles.exitButtonIcon} source={icons.cross} />
            </TouchableOpacity>
            {/* Edycja deadline */}
            <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => save()}>
            <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Edytuj deadline</Text>
            </TouchableOpacity>
            {/* Przejście do szczegółów */}
            <TouchableOpacity style={[styles2.optionButtons,{backgroundColor: themeID.colorButton1}]} onPress={() => {props.close(); props.navigation.push('Task', {'task': task, 'index': props.ids});}}>
            <Text style={{fontSize: 16, color: themeID.colorText1, alignSelf: "center"}}>Wyświetl szczegóły</Text>
            </TouchableOpacity>
            {/* Przycisk zakończ/kontynuuj zadanie */}
            <ChangeEndingState />
            {/* Przycik usuń zadanie */}
            <RemoveTask />
        </View>
        );
    }catch (err){
      console.log(err);
    }
    return null;
}

export default TaskOptions;