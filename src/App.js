import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Home from './routes/Home';
import Tasks from './routes/Tasks';
import Events from './routes/Events';
import Callendar from './routes/Callendar';
import Notes from './routes/Notes';
import Profile from './routes/Profile';
import Settings from './routes/Settings';

import styles from './styles/styles';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tasks" component={Tasks} />
          <Stack.Screen name="Callendar" component={Callendar} />
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="Notes" component={Notes} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
};