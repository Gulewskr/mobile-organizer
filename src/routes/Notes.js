import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import {useTheme} from '../styles/colors.js';

export default Notes = ({navigation}) => {
  const { themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Notatki'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};