import React, {useContext, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import styles2 from '../styles/optionStyles';
import {useTheme} from '../data/colors.js';
import {getProfileSettings} from '../data/ProfileContext';
import {ThemesIcon, Themes} from '../data/colors';
import {DataContext} from '../data/DataContext';


export default Settings = ({navigation}) => {

  const { resetDatabase } = useContext(DataContext);
  const { theme, setTheme, themeID, ThemeIcon } = useTheme();
  const { profileName, setProfileName, profileIcon, setProfileIcon, iconProfileAvatar } = getProfileSettings();

  const ProfileName = () => {
    
    return(
      <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
        <Text style={[styles2.font, {color: themeID.colorText1}]}>Nazwa użytkownika</Text>
        <Text style={[styles2.font, {color: themeID.colorText1}]}>{profileName}</Text>
      </View>
    );
  }

  const AvatarMenu = () => {
    
    const [menu, setMenu] = useState(false);
    const [page, setPage] = useState(0);

    const MenuSide = () => {
      return(
        <>
        </>
      );
    }

    return(
      <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
        <View style={{flexDirection: "row"}}>
          <View style={styles2.sectorL}>
            <Text style={[styles2.font, {color: themeID.colorText1}]}>AVATAR</Text>
          </View>
          <View style={styles2.sectorR}>
            <TouchableOpacity style={styles2.iconButton}>
              <Image style={styles2.icon} source={iconProfileAvatar} />
            </TouchableOpacity>
          </View>
          {menu && 
            null
          }
        </View>
      </View>
    );
  }

  const ThemeMenu = () => {

    const [menu, setMenu] = useState(false);

    var table = null;
    table = Themes.map((data, ind) => {
      return(
        <TouchableOpacity key={ind} onPress ={ () => setTheme(Themes[ind])}
        ><Text>COLOR: {data}</Text></TouchableOpacity> 
      );
    });

    return(
      <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
      <View style={{flexDirection: "row"}}>
        <View style={styles2.sectorL}>
          <Text style={[styles2.font, {color: themeID.colorText1}]}>Motyw</Text>
        </View>
        <View style={styles2.sectorR}>
          <TouchableOpacity style={styles2.iconButton}>
            <Image style={styles2.icon} source={ThemeIcon} />
          </TouchableOpacity>
        </View>
        {menu && 
          null
        }
      </View>
    </View>
    );
  }

  const DataReset = () => {
    
    return(
      <TouchableOpacity onPress ={ () => {resetDatabase()}}
        ><Text>Reset danych</Text></TouchableOpacity> 
    );
  }

  return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Ustawienia'} navigate={navigation} />
        <ScrollView style={{width:"100%", paddingTop: 10}}>
          <ProfileName />
          <AvatarMenu />
          <ThemeMenu />
          <DataReset />
        </ScrollView>
      </View>
  );
};