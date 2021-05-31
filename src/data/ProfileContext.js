import React, {createContext,  useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileIcons} from './icons';

export const ProfileContext = createContext();

function ProfileContextProvider({ children }){
    const [profileName, setProfileName] = useState("Nazwa użytkownika"); 
    const [profileIcon, setProfileIcon] = useState(0);
    const [endedTasks, setEndedTasks] = useState(0);
    const [notEndedTasks, setNotEndedTasks] = useState(0);
    const [noteNumber, setNoteNumber] = useState(0);


    useEffect(() => {
      AsyncStorage.getItem('UserIcon').then((v) => {
        if (v){
          setProfileIcon(parseInt(v));
        }
      });
      AsyncStorage.getItem('UserName').then((v) => {
        if (v){
          setProfileName(v);
        }
      });
      AsyncStorage.getItem('ETasks').then((v) => {
        if (v){
          setEndedTasks(parseInt(v));
        }
      });
      AsyncStorage.getItem('NETasks').then((v) => {
        if (v){
          setNotEndedTasks(parseInt(v));
        }
      });
      AsyncStorage.getItem('Notes').then((v) => {
        if (v){
          setNoteNumber(parseInt(v));
        }
      });
    }, []);

    useEffect(() => {
      AsyncStorage.setItem('UserIcon', profileIcon.toString() );
      AsyncStorage.setItem('UserName', profileName );
      AsyncStorage.setItem('ETasks', endedTasks.toString()  );
      AsyncStorage.setItem('NETasks', notEndedTasks.toString()  );
      AsyncStorage.setItem('Notes', noteNumber.toString()  );
    }, [profileIcon, profileName, endedTasks, notEndedTasks, noteNumber]);

    const value = useMemo(
      () => ({
        profileName,
        setProfileName,
        profileIcon,
        setProfileIcon,
        endedTasks,
        setEndedTasks,
        notEndedTasks,
        setNotEndedTasks,
        noteNumber,
        setNoteNumber,
      }),
      [profileName, setProfileName, profileIcon, setProfileIcon, endedTasks,
        setEndedTasks, notEndedTasks, setNotEndedTasks, noteNumber, setNoteNumber],
    );

    return (
      <ProfileContext.Provider value={value}>
        {children}
      </ProfileContext.Provider>
    );
};

function getProfileSettings(){
  const {profileName, setProfileName, profileIcon, setProfileIcon, endedTasks,
    setEndedTasks, notEndedTasks, setNotEndedTasks, noteNumber, setNoteNumber} = useContext(ProfileContext);
  const iconProfileAvatar = profileIcons[profileIcon];
  const resetStats = () => {
    setEndedTasks(0);
    setNotEndedTasks(0);
    setNoteNumber(0);
  }
  return(
    {profileName, setProfileName, profileIcon, setProfileIcon, endedTasks,
      setEndedTasks, notEndedTasks, setNotEndedTasks, noteNumber,
      resetStats, setNoteNumber, iconProfileAvatar}
  );
};

export {getProfileSettings}
export default ProfileContextProvider;