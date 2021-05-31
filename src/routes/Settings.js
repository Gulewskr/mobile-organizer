import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, Image, TextInput} from 'react-native';

import { icons } from '../components/icons';
import {NavbarSettings} from '../components/navbar';

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
  const { profileName, setProfileName, resetStats, setProfileIcon, iconProfileAvatar } = getProfileSettings();

  const ProfileName = () => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(profileName);

    const confirm = (bool) => {
      if(bool) setProfileName(name);
      setEdit(false);
    }

    return(
      <>
      <TouchableOpacity style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]} onPress={()=>{setEdit(true)}}>
        <Text style={[styles2.font, {color: themeID.colorText1}]}>Nazwa użytkownika</Text>
        <Text style={[styles2.font, {color: themeID.colorText1}]}>{profileName}</Text>
      </TouchableOpacity>
      {edit &&
        <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
            <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>Zmiana nazwy użytkownika</Text>
            <TextInput multiline={true} editable={true} style={[styles2.optionsText, {color: themeID.colorTextInput, padding: 5, width: "80%", textAlign: "center", backgroundColor: themeID.colorTextInputBackground}]} onChangeText={setName} value={ name } />
            <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
                <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                    <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Zapisz</Text>
                </TouchableOpacity>
                <View style={{width: "15%"}}></View>
                <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                    <Text style={[styles.ConfirmButtonText, { color: "#FE1010"}]} >Anuluj</Text>
                </TouchableOpacity>
            </View>
        </View>
      }
      </>
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
          <TouchableOpacity key={index} style={styles2.iconMenu} onPress ={ () => {setProfileIcon(index); setMenu(false)}}>
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
        <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{setMenu(!menu)}}>
          <View style={styles2.sectorL}>
            <Text style={[styles2.font, {color: themeID.colorText1}]}>AVATAR</Text>
          </View>
          <View style={styles2.sectorR}>
            <View style={styles2.iconButton}>
              <Image style={styles2.icon} source={iconProfileAvatar} />
            </View>
          </View>
        </TouchableOpacity>
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

    const [menu, setMenu] = useState(false);

    const confirm = (bool) => {
      if(bool)resetStats();
      setMenu(false);
    }

    const Confirmation = () => {
      return(
      <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
          <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>Czy chcesz zresetować postępy?</Text>
          <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
              <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                  <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
              </TouchableOpacity>
              <View style={{width: "15%"}}></View>
              <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                  <Text style={[styles.ConfirmButtonText, { color: "#FE1010"}]} >Nie</Text>
              </TouchableOpacity>
          </View>
      </View>);
    }

    return(
    <>
    <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
      <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{setMenu(true)}}>
        <View style={styles2.sectorL}>
          <Text style={[styles2.font, {color: themeID.colorText1}]}>Zresetuj statystyki</Text>
        </View>
        <View style={styles2.sectorR}>
          <View style={styles2.iconButton}>
            <Image style={styles2.icon} source={icons.reset} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
    {menu &&
    <>
    <Confirmation />
    <TouchableOpacity style={styles.fillRect} onPress={() => setMenu(false)}/>
    </>
    }
    </>
    );
  }

  const DataDelete = () => {

    const [menu, setMenu] = useState(false);

    const confirm = (bool) => {
      if(bool)resetDatabase();
      setMenu(false);
    }

    const Confirmation = () => {
      return(
      <View style={[styles.ConfirmButton, {backgroundColor: themeID.colorContainer}]}>
          <Text style={[styles.ConfirmButtonText, {color: themeID.colorText1}]}>Czy chcesz usunąć wszystkie dane?</Text>
          <View style={{flexDirection:"row", alignContent:"center", marginTop: 10}}>
              <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(true)}>
                  <Text style={[styles.ConfirmButtonText, { color: "#129403"}]} >Tak</Text>
              </TouchableOpacity>
              <View style={{width: "15%"}}></View>
              <TouchableOpacity style={[styles.ConfirmButtonButton, {backgroundColor: themeID.colorButton1}]} onPress = {() => confirm(false)}>
                  <Text style={[styles.ConfirmButtonText, { color: "#FE1010"}]} >Nie</Text>
              </TouchableOpacity>
          </View>
      </View>);
    }

    return(
    <>
    <View style={[styles2.optionContainer, {backgroundColor: themeID.colorContainer}]}>
      <TouchableOpacity style={{flexDirection: "row"}} onPress={()=>{setMenu(true)}}>
        <View style={styles2.sectorL}>
          <Text style={[styles2.font, {color: themeID.colorText1}]}>Usuń dane</Text>
        </View>
        <View style={styles2.sectorR}>
          <View style={[styles2.iconButton,{backgroundColor: themeID.colorButton2}]}>
            <Image style={[styles2.icon, {height: "80%", alignSelf: "center"}]} source={icons.trash} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
    {menu &&
    <>
    <Confirmation />
    <TouchableOpacity style={styles.fillRect} onPress={() => setMenu(false)}/>
    </>
    }
    </>
    );
  }

  return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarSettings napis={'Ustawienia'} navigate={navigation} />
        <ScrollView style={{width:"100%", paddingTop: 10}}>
          <ProfileName />
          <AvatarMenu />
          <ThemeMenu />
          <DataReset />
          <DataDelete />
        </ScrollView>
      </View>
  );
};