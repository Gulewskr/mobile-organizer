import React from 'react';
import {View, ScrollView} from 'react-native';
import {NavbarBack} from '../components/navbar';
import styles from '../styles/styles';

export default Events = ({navigation}) => {
    return (
      <View style={styles.container}>
        <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};