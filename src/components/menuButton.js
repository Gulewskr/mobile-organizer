import React from 'react';
import {View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles.js';

const MenuButton = (props) => {
    return (
        <TouchableOpacity  style = {styles.menuButton}
        onPress={() => props.navigate.navigate(props.route) }>
            <Image style = {styles.profile_icon} source={props.icon} />
            <View style = {styles.menuButton_textContainer}>
             <Text style = {styles.menuButton_text}>{props.Text}</Text>
            </View>
        </TouchableOpacity >
    );
};

export default MenuButton;