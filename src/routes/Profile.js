import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import { icons } from '../components/icons';
import {NavbarProfile} from '../components/navbar';

import styles from '../styles/styles';
import {useTheme} from '../data/colors.js';

export default Profil = ({navigation}) => {
  const { themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarProfile napis={'Profil'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};