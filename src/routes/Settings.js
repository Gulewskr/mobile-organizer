import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import styles2 from '../styles/optionStyles';
import {useTheme} from '../data/colors.js';
import {getProfileSettings} from '../data/ProfileContext';
import {ThemesIcon, Themes} from '../data/colors';
import {profileIcons} from '../data/icons';
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

    //setProfileIcon(index)

    const MenuSide = () => {
      var t = null;
      t = profileIcons.map((icon, index) => {
        return(
          <TouchableOpacity key={index} style={styles2.iconMenu} onPress ={ () => setProfileIcon(index)}>
            <Image style={styles2.icon} source={icon} />
          </TouchableOpacity>
        );
      })
      return(
        t
      );
    }

    return(
      <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
        <View style={{flexDirection: "row"}}>
          <View style={styles2.sectorL}>
            <Text style={[styles2.font, {color: themeID.colorText1}]}>AVATAR</Text>
          </View>
          <View style={styles2.sectorR}>
            <TouchableOpacity style={styles2.iconButton} onPress={()=>{setMenu(true)}}>
              <Image style={styles2.icon} source={iconProfileAvatar} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          {menu && <MenuSide />}
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

    const SingleRowMenu = (props) => {
      const row = props.row;
      return(
        <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles2.iconMenu} onPress ={ () => setTheme(Themes[row*3])}>
          <Image style={styles2.icon} source={ThemesIcon[row*3]} />
        </TouchableOpacity> 
        <TouchableOpacity style={styles2.iconMenu} onPress ={ () => setTheme(Themes[row*3+1])}>
          <Image style={styles2.icon} source={ThemesIcon[row*3+1]} />
        </TouchableOpacity> 
        <TouchableOpacity style={styles2.iconMenu} onPress ={ () => setTheme(Themes[row*3+2])}>
          <Image style={styles2.icon} source={ThemesIcon[row*3+2]} />
        </TouchableOpacity> 
        </View>
      );
    }

    const IconMenu = () => {
      return(
        <>
        <SingleRowMenu row={0}/>
        <SingleRowMenu row={1}/>
        <SingleRowMenu row={2}/>
        <SingleRowMenu row={3}/>
        </>
      );
    }

    return(
    <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
      <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{setMenu(!menu)}}>
        <View style={styles2.sectorL}>
          <Text style={[styles2.font, {color: themeID.colorText1}]}>Motyw</Text>
        </View>
        <View style={styles2.sectorR}>
          <View style={styles2.iconButton}>
            <Image style={styles2.icon} source={ThemeIcon} />
          </View>
        </View>
      </TouchableOpacity>
      {menu && <IconMenu />}
    </View>
    );
  }

  const DataReset = () => {
    
    return(
      <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
      <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{resetDatabase()}}>
        <View style={styles2.sectorL}>
          <Text style={[styles2.font, {color: themeID.colorText1}]}>Motyw</Text>
        </View>
        <View style={styles2.sectorR}>
          <View style={styles2.iconButton}>
            <Image style={styles2.icon} source={icons.reset} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
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