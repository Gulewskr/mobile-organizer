import React from 'react';
import { View, ScrollView } from 'react-native';
import {NavbarBack} from '../components/navbar';
import {Task} from '../components/task';
import styles from '../styles/styles';

export default Tasks = ({navigation}) => {
    return (
      <View style={styles.container}>
        <NavbarBack napis={'Zadania'} navigate={navigation} />
        <ScrollView style = {{marginTop: 10}}>
        </ScrollView>
      </View>
    );
};