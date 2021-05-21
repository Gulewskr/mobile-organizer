import * as React from 'react';
import {useState} from 'react';
import FileSystem from 'expo-file-system'
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Home from './routes/Home';
import Tasks from './routes/Tasks';
import TaskSpec from './routes/TaskSpec';
import Events from './routes/Events';
import Callendar from './routes/Callendar';
import Notes from './routes/Notes';
import Profile from './routes/Profile';
import Settings from './routes/Settings';

import {DataContextProvider} from './data/DataContext';
import useDatabase from './data/useDatabase'

import styles from './styles/styles';
import ThemeContextProvider from './data/colors';

const Stack = createStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync(); //don't let the splash screen hide

  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();

    return (
      <ThemeContextProvider>
      <DataContextProvider>
          <NavigationContainer screenOptions={{
            headerShown: false
          }}>
            <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Tasks" component={Tasks} />
              <Stack.Screen name="Task" component={TaskSpec} initialParams={{'task': 'shit'}}/>
              <Stack.Screen name="Callendar" component={Callendar} />
              <Stack.Screen name="Events" component={Events} />
              <Stack.Screen name="Notes" component={Notes} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
      </DataContextProvider>
      </ThemeContextProvider>
    );
  } else {
    return null;
  }
};