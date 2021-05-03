import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

import styles from '../styles/styles';
import { withTheme } from '../styles/colors';

const Task = (props) => {
    return (
        <View>
            <View>
                <Text>
                    {props.nazwa}
                </Text>
                { (props.deadline != undefined) &&
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

export {Task};
export default Task;