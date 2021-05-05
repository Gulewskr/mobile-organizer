import React, { useState, version } from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../components/icons';
import styles from '../styles/stylesTask';
import { useTheme } from '../styles/colors';

const Task = (props) => {
    /*
    const key = props.index;
    const [name, setName] = useState(props.nazwa);
    const [deadline, setDeadline] = useState(props.deadline);
    const [day, setDay] = useState(props.day);
    const [month, setMonth] = useState(props.month);
    const [year, setYear] = useState(props.year);
    const [specified, setSpecified] = useState(props.specified);
    const [ended, setEnded] = useState(props.ended);
    */
    const more = props.more;
    const [progress, setProggres] = useState(calculateProgres(more));

    const { themeID } = useTheme();

    return (
        <View style={[styles.taskContainer, {backgroundColor: themeID.colorContainer}]}>
            <View style={styles.textContainer} >
                <Text style={[styles.taskText, {fontSize: 26, color: themeID.colorText1}]}>
                    {props.nazwa}
                </Text>
                { props.deadline != false &&
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Deadline</Text>
                        <Text style={styles.deadlineText} >{props.day + " " + props.month + " " + props.year}</Text>
                    </View>
                }
                { props.specified != false &&
                    <View style={{flexDirection: "row"}}>
                        <Text style={[styles.taskText, {color: themeID.colorText1}]}>Ukończenie</Text>
                        <Text style={styles.proggresText} >{progress}</Text>
                    </View>
                }
            </View>
            <TouchableOpacity style={[styles.iconContainer, {backgroundColor: themeID.colorButton1}]} onPress = {() => {props.setV(true); props.setT(props.index)}} >
                <Image style={styles.icon} source={icons.arrowRight} />
            </TouchableOpacity>
        </View >
    )
}

function calculateProgres(tasks)
{
    if(tasks.length == 0) return "brak zadan";

    let ended = 0;
    for(let i = 0; i < tasks.length ; i++)
    {
        if(tasks[i].ended) ended++;
    };

    return ((ended/tasks.length) * 100) + "%";
}

export default Task