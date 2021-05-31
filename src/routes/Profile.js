import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image, TextInput} from 'react-native';

import { icons } from '../components/icons';
import {NavbarProfile} from '../components/navbar';

import styles from '../styles/styles';
import styles2 from '../styles/optionStyles';
import {useTheme} from '../data/colors.js';
import {getProfileSettings} from '../data/ProfileContext';
import {ThemesIcon, Themes} from '../data/colors';
import {profileIcons} from '../data/icons';
import {DataContext} from '../data/DataContext';

export default Profil = ({navigation}) => {
  const { themeID } = useTheme();
  const { resetDatabase } = useContext(DataContext);
  const { iconProfileAvatar, profileName, endedTasks, notEndedTasks, noteNumber } = getProfileSettings();

  const ProfileWidget = () => {
    return(
      <View style={[styles2.profileContainer, {backgroundColor: themeID.colorContainer}]}>
      <View style={[styles2.profileBackground, {backgroundColor: themeID.colorHeader1}]}>
        <View style={styles2.ProfileAvatar}>
            <Image style={styles2.icon} source={iconProfileAvatar} />
        </View>
      </View>
      <View>
        <Text style={[styles2.nameFont, {color: themeID.colorText1}]}>{profileName}</Text>
      </View>
      </View>
    );
  }

  const Widget = (props) => {
    return(
      <View style={[styles2.optionContainer, {padding: 5, backgroundColor: themeID.colorContainer}]}>
        <View style={{flexDirection: "row"}}>
          <View style={styles2.sectorR}>
            <View style={styles2.iconButton}>
              <Image style={styles2.icon} source={props.icon} />
            </View>
          </View>
          <View style={styles2.sectorL}>
            <Text style={[styles2.font, {color: themeID.colorText1}]}>{props.text}</Text>
            <Text style={[styles2.font2, {color: themeID.colorText1}]}>{props.value}</Text>
          </View>
        </View>
      </View>
    );
  }

    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarProfile napis={'Profil'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
          <ProfileWidget />
          <Widget icon={icons.checked} text={"Ukończone zadania"} value={endedTasks} />
          <Widget icon={icons.unchecked} text={"Zaległe zadania"} value={notEndedTasks} />
          <Widget icon={icons.marker} text={"Zapisanych notatek"} value={noteNumber} />
        </ScrollView>
      </View>
    );
};