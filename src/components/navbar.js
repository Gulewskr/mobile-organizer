import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles/styles.js';
import {icons} from './icons.js';

const NavbarMenu = () => {
    return (
        <View style = {styles.navbar}>
             <Text style = {styles.navbar_text}>MOBILE-ORGANIZER</Text>
        </View>
    );
};

const NavbarBack = (props) => {
    return (
        <View style = {[styles.navbar, styles.navbar2]}>
         <TouchableOpacity style = {styles.navbar_icon_continer} onPress={() => props.navigate.navigate("Profile") }>
          <Image style = {styles.navbar_icon} source={icons.profile} />
         </TouchableOpacity>
         <View style = {styles.navbar_text_Container}>
         <Text style = {[styles.navbar_text, styles.navbar_text2]}>{props.napis}</Text>
         </View>
         <TouchableOpacity style = {styles.navbar_button} onPress={() => props.navigate.goBack() } >
            <Image style = {styles.navbar_button_icon} source={icons.backArrow} />
         </TouchableOpacity>
        </View>
    );
};

export {NavbarBack, NavbarMenu};
export default NavbarMenu;