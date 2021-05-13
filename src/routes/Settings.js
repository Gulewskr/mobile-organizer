import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import {useTheme} from '../data/colors.js';

export default Settings = ({navigation}) => {
  const { setTheme, themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Ustawienia'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        <TouchableOpacity onPress ={ () => setTheme('yellow')}
        ><Text>COLOR: yellow</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('pink')}
        ><Text>COLOR: pink</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('grey')}
        ><Text>COLOR: grey</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('yellow-white')}
        ><Text>COLOR: yellow-white</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('red-white')}
        ><Text>COLOR: red-white</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('blue-white')}
        ><Text>COLOR: blue-white</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('blue')}
        ><Text>COLOR: blue</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('purple')}
        ><Text>COLOR: purple</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('orange')}
        ><Text>COLOR: orange</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('red-dark')}
        ><Text>COLOR: red-dark</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('green-dark')}
        ><Text>COLOR: green-dark</Text></TouchableOpacity> 
        <TouchableOpacity onPress ={ () => setTheme('blue-dark')}
        ><Text>COLOR: blue-dark</Text></TouchableOpacity> 
        </ScrollView>
      </View>
    );
};