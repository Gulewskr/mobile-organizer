import React, {useState, useRef, useContext, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { Route } from '@react-navigation/native';

import { DataContext } from '../data/DataContext';
import { dataString } from '../data/calendar';

import DeadlineChanger from '../components/deadlineChanger';
import { NavbarBack } from '../components/navbar';
import TaskOptions from '../components/taskOptions';
import Task from '../components/task';
import AddTaskMenu from '../components/addingTask';
import SortTaskMenu from '../components/sortingTask';
import DeleteMenu from '../components/deleteMenu';
import NoteOptions from '../components/tagMenu';

import styles from '../styles/styles';
import styles2 from '../styles/stylesTask';
import styles3 from '../styles/stylesDialog';
import { useTheme } from '../data/colors';
import { icons } from '../components/icons';

import { useIsFocused } from "@react-navigation/native";

export default EventSpec = ({navigation, route}) => {
  //TODO strona specyficznego wydarzenia
  return(
    <View style={[styles.container, {backgroundColor: themeID.colorBackground}]}>
      <NavbarBack napis={'Wydarzenia'} navigate={navigation} />
    </View>
  );
};