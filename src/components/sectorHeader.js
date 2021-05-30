import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import styles from '../styles/stylesTask';
import { useTheme } from '../data/colors';

const SectorMenu = (props) => {
    const { themeID } = useTheme();
    return (
    <View style={styles.sectorHeader}>
          <View style={{width: "85%"}}>
            <Text style={[styles.taskText, {marginLeft:"2%", color: themeID.colorText2}]}>{props.name}</Text>
            <View style={[styles.line,{backgroundColor: themeID.colorText2}]}/>
          </View>
    </View>
    );
}

export {SectorMenu}