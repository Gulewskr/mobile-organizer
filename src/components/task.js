import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';

const Task = (props) => {
    return (
        <View  style = {styles.menuButton} >
            <View>
                <Text>
                    {props.nazwa}
                </Text>
                { props.haveDeadline &&
                    <View>
                        <Text>Deadline</Text>
                        <Text>{props.deadline}</Text>
                    </View>
                }
                { props.extended &&
                    <View>
                        <Text>Deadline</Text>
                        <Text>{props.deadline}</Text>
                    </View>
                }
            </View>
            <TouchableOpacity>
            </TouchableOpacity>
        </View >
    );
};

export default Task;