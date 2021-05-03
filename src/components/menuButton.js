import React from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';
import { useTheme } from '../styles/colors';

const MenuButton = (props) => {
    const { themeID } = useTheme();
    return (
        <TouchableOpacity  style = {[styles.menuButton, {backgroundColor: themeID.colorContainer}]}
        onPress={() => props.navigate.navigate(props.route) }>
            <Image style = {styles.profile_icon} source={props.icon} />
            <View style = {styles.menuButton_textContainer}>
             <Text style = {[styles.menuButton_text, {color: themeID.colorText1}]}>{props.Text}</Text>
            </View>
        </TouchableOpacity >
    );
};

export default MenuButton;