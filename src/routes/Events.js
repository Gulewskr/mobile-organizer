import React from 'react';
import {View, ScrollView} from 'react-native';

import {NavbarBack} from '../components/navbar';

import styles from '../styles/styles';
import {useTheme} from '../styles/colors.js';

export default Events = ({navigation}) => {
  const { themeID } = useTheme();
    return (
      <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
        <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};