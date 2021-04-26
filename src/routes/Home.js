import React from 'react';
import {View, ScrollView } from 'react-native';
import { icons } from '../components/icons';
import NavbarMenu from '../components/navbar';
import MenuButton from '../components/menuButton';
import styles from '../styles/styles';

const Home = ({navigation}) => {
    return (
      <View style={styles.container}>
        <NavbarMenu />
        <ScrollView style = {{marginTop: 10}}>
         <MenuButton icon = {icons.task} Text={'ZADANIA'} navigate={navigation} route={'Tasks'}  />
         <MenuButton icon = {icons.calendar} Text={'KALENDARZ'} navigate={navigation} route={'Callendar'}  />
         <MenuButton icon = {icons.cake} Text={'WYDARZENIA'} navigate={navigation} route={'Events'} />
         <MenuButton icon = {icons.marker} Text={'NOTATKI'} navigate={navigation} route={'Notes'}  />
         <MenuButton icon = {icons.profile} Text={'PROFIL'} navigate={navigation} route={'Profile'}  />
         <MenuButton icon = {icons.settings} Text={'USTAWIENIA'} navigate={navigation} route={'Settings'} />
        </ScrollView>
      </View>
    );
};

export default Home;