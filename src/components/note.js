import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '../components/icons';
import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import { useTheme } from '../data/colors';

import {dataString} from '../data/calendar';

const Note = (props) => {
    const { themeID } = useTheme();
    return(
        <View style={[styles2.taskContainer, {backgroundColor: themeID.colorContainer}]}>
          <Text style={{fontSize: 20, color: themeID.colorText1, width:"80%"}}>{props.data.name}</Text>
          <TouchableOpacity style={[styles2.iconContainer2, {backgroundColor: themeID.colorButton1}]} 
          onPress={() => props.press()}>
            <Image source={icons.arrowRight} style={styles2.icon} />
          </TouchableOpacity>
        </View>
    );
}

export default Note