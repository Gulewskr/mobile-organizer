import React, {useContext} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {icons} from './icons.js';
import {DataContext} from '../data/DataContext';

import styles from '../styles/styles';
import { useTheme } from '../data/colors';
import {getProfileSettings} from '../data/ProfileContext';


const NavbarMenu = (props) => {
    const { themeID } = useTheme();
  return (
        <View style = {[styles.navbar, {backgroundColor: themeID.colorHeader1}]}>
             <Text style = {styles.navbar_text}>MOBILE-ORGANIZER</Text>
        </View>
    );
};

const NavbarBack = (props) => {
    const { themeID } = useTheme();
    const { iconProfileAvatar } = getProfileSettings();
    const { PrevID } = useContext(DataContext);
    return (
        <View style = {[styles.navbar, styles.navbar2,  {backgroundColor: themeID.colorHeader2}]}>
         <TouchableOpacity style = {styles.navbar_icon_continer} onPress={() => props.navigate.navigate("Profile") }>
          <Image style = {styles.navbar_icon} source={iconProfileAvatar} />
         </TouchableOpacity>
         <View style = {styles.navbar_text_Container}>
         <Text style = {[styles.navbar_text, styles.navbar_text2]}>{props.napis}</Text>
         </View>
         <TouchableOpacity style = {[styles.navbar_button, {backgroundColor: themeID.colorButton1}]} 
         onPress={() => { props.navigate.goBack() }}>
            <Image style = {styles.navbar_button_icon} source={icons.backArrow} />
         </TouchableOpacity>
        </View>
    );
};

const NavbarProfile = (props) => {
    const { themeID } = useTheme();
    return (
        <View style = {[styles.navbar, styles.navbar2,  {backgroundColor: themeID.colorHeader2}]}>
         <TouchableOpacity style = {[styles.navbar_button, {backgroundColor: themeID.colorButton1}]} onPress={() => props.navigate.navigate("Settings") } >
            <Image style = {styles.navbar_button_icon} source={icons.settingsWheel} />
         </TouchableOpacity>
         <View style = {styles.navbar_text_Container}>
         <Text style = {[styles.navbar_text, styles.navbar_text2]}>{props.napis}</Text>
         </View>
         <TouchableOpacity style = {[styles.navbar_button, {backgroundColor: themeID.colorButton1}]} onPress={() => props.navigate.goBack() } >
            <Image style = {styles.navbar_button_icon} source={icons.backArrow} />
         </TouchableOpacity>
        </View>
    );
};


export { NavbarProfile, NavbarBack, NavbarMenu };
export default NavbarMenu;