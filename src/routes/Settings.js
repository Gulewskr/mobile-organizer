import React from 'react';
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import styles2 from '../styles/optionStyles';
import {useTheme} from '../data/colors.js';
import {ThemesIcon, Themes} from '../data/colors';

export default Settings = ({navigation}) => {

  const ProfileName = () => {
    
    return(
      <View>
        <Text>Nazwa użytkownika</Text>
      </View>
    );
  }

  const AvatarMenu = () => {
    
    return(
      <View>
        <Text>AVATAR</Text>
      </View>
    );
  }

  const ThemeMenu = () => {
    var table = null;
    table = Themes.map((data, ind) => {
      return(
        <TouchableOpacity key={ind} onPress ={ () => setTheme(Themes[ind])}
        ><Text>COLOR: {data}</Text></TouchableOpacity> 
      );
    });

    return(
      <View>
        {table}
      </View>
    );
  }

  const DataReset = () => {
    
  }

  const { setTheme, themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Ustawienia'} navigate={navigation} />
        <ScrollView>
          <ProfileName />
          <AvatarMenu />
          <ThemeMenu />
        </ScrollView>
      </View>
    );
};