import React, {createContext,  useContext, useMemo, useState } from 'react';
import {profileIcons} from './icons';

export const ProfileContext = createContext();

function ProfileContextProvider({ children }){
    const [profileName, setProfileName] = useState("Nazwa użytkownika"); 
    const [profileIcon, setProfileIcon] = useState(0);

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