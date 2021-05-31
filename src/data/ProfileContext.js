import React, {createContext,  useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {profileIcons} from './icons';

export const ProfileContext = createContext();

function ProfileContextProvider({ children }){
    const [profileName, setProfileName] = useState("Nazwa użytkownika"); 
    const [profileIcon, setProfileIcon] = useState(0);

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
    }, []);

    useEffect(() => {
      AsyncStorage.setItem('UserIcon', profileIcon.toString() );
      AsyncStorage.setItem('UserName', profileName );
    }, [profileIcon, profileName]);

    const value = useMemo(
      () => ({
        profileName,
        setProfileName,
        profileIcon,
        setProfileIcon
      }),
      [profileName, setProfileName, profileIcon, setProfileIcon],
    );

    return (
      <ProfileContext.Provider value={value}>
        {children}
      </ProfileContext.Provider>
    );
};

function getProfileSettings(){
  const {profileName, setProfileName, profileIcon, setProfileIcon} = useContext(ProfileContext);
  const iconProfileAvatar = profileIcons[profileIcon];
  return(
    {profileName, setProfileName, profileIcon, setProfileIcon, iconProfileAvatar}
  );
};

export {getProfileSettings}
export default ProfileContextProvider;