import React, { useContext } from 'react';
import {View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { icons } from '../components/icons';
import NavbarMenu from '../components/navbar';
import MenuButton from '../components/menuButton';

import styles from '../styles/styles';
import {useTheme} from '../data/colors.js';
import {getProfileSettings} from '../data/ProfileContext';

const Home = ({navigation}) => {
  const { themeID } = useTheme();
  const { iconProfileAvatar } = getProfileSettings();
  return (
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarMenu />
      <ScrollView style = {{width: "100%"}}>
       <MenuButton icon = {icons.task} Text={'ZADANIA'} navigate={navigation} route={'Tasks'}  />
       <MenuButton icon = {icons.calendar} Text={'KALENDARZ'} navigate={navigation} route={'Callendar'}  />
       <MenuButton icon = {icons.cake} Text={'WYDARZENIA'} navigate={navigation} route={'Events'} />
       <MenuButton icon = {icons.marker} Text={'NOTATKI'} navigate={navigation} route={'Notes'}  />
       <MenuButton icon = {iconProfileAvatar} Text={'PROFIL'} navigate={navigation} route={'Profile'}  />
       <MenuButton icon = {icons.settings} Text={'USTAWIENIA'} navigate={navigation} route={'Settings'} />
       <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

export default Home;