import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../components/icons';
import styles from '../styles/stylesTask';
import { useTheme } from '../data/colors';

import {dataString} from '../data/calendar';

const Task = (props) => {
    const { themeID } = useTheme();
    return (
        <View style={[styles.taskContainer, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.textContainer} >
                <Text style={[styles.taskText, {fontSize: 18, color: themeID.colorText1}]}>
                    {props.nazwa}
                </Text>
                { props.deadline != false &&
                    <View style={{width: "100%", flexWrap: 'wrap'}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Deadline</Text>
                        <Text style={styles.deadlineText} >{ dataString(props.day, props.month, props.year) }</Text>
                    </View>
                }
                { props.spec ?
                    props.ended ?
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: "#129403"}]}>Ukończono</Text>
                    </View>
                    :
                    <View style={{flexDirection: "row", width: "100%", flexWrap: 'wrap'}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Ukończenie</Text>
                        <Text style={styles.proggresText} >{props.progress}%</Text>
                    </View>
                    :
                    props.ended == true &&
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: "#129403"}]}>Ukończono</Text>
                    </View>
                }
            </View>
            <TouchableOpacity style={[styles.iconContainer, {backgroundColor: themeID.colorButton1}]} onPress = {() => {props.press()}} >
                <Image style={styles.icon} source={icons.arrowRight} />
            </TouchableOpacity>
        </View >
    );
}


const TaskDelete = (props) => {
    const [choosen, setChoose] = useState(false);
    const { themeID } = useTheme();

    useEffect(() => {
        if(choosen){     
            props.add();
        }else{
            props.remove();
        }
       }, [choosen])

    return (
        <View style={[styles.taskContainer, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.textContainer} >
                <Text style={[styles.taskText, {fontSize: 18, color: themeID.colorText1}]}>
                    {props.nazwa}
                </Text>
                { props.deadline != false &&
                    <View style={{width: "100%", flexWrap: 'wrap'}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Deadline</Text>
                        <Text style={styles.deadlineText} >{ dataString(props.day, props.month, props.year) }</Text>
                    </View>
                }
                { props.spec ?
                    props.ended ?
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: "#129403"}]}>Ukończono</Text>
                    </View>
                    :
                    <View style={{flexDirection: "row", width: "100%", flexWrap: 'wrap'}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Ukończenie</Text>
                        <Text style={styles.proggresText} >{props.progress}%</Text>
                    </View>
                    :
                    props.ended == true &&
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: "#129403"}]}>Ukończono</Text>
                    </View>
                }
            </View>
            <TouchableOpacity activeOpacity={1}  style={[styles.iconContainer, choosen ? {backgroundColor: "#ff0000"} : {backgroundColor: themeID.colorButtonUnchecked1} ]} 
                onPress = {() => {setChoose(!choosen);}} >
                <Image style={[styles.icon, choosen ? {opacity: 1} : {opacity: 0.2} ]} source={icons.trash} />
            </TouchableOpacity>
        </View >
    );
}


export {TaskDelete}
export default Task