import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import { icons } from '../components/icons';
import {NavbarBack} from '../components/navbar';
import styles from '../styles/styles';

export default Callendar = ({navigation}) => {
    return (
      <View style={styles.container}>
        <NavbarBack napis={'Kalendarz'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};