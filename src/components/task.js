import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../components/icons';
import styles from '../styles/stylesTask';
import { useTheme } from '../data/colors';

import {dataString} from '../data/calendar';

const Task = (props) => {
    
    const more = props.more;
    const { themeID } = useTheme();

    let specified = !(more == undefined || more == null || more == "" || more.length == 0);

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
            <TouchableOpacity style={[styles.iconContainer, {backgroundColor: themeID.colorButton1}]} onPress = {() => {props.showOptions(); props.setId()}} >
                <Image style={styles.icon} source={icons.arrowRight} />
            </TouchableOpacity>
        </View >
    );
}

function calculateProgres(tasks)
{
    let ended = 0;
    for(let i = 0; i < tasks.length ; i++)
    {
        if(tasks[i].ended) ended++;
    };

    return ((ended/tasks.length) * 100) + "%";
}

export default Task