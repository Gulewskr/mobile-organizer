import React, {createContext,  useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import col from "./colors.json";

export const ThemeContext = createContext();
export const Themes =
[
  'yellow',
  'pink',
  'grey',
  'yellow-white',
  'red-white',
  'blue-white',
  'blue',
  'purple',
  'orange',
  'red-dark',
  'green-dark',
  'blue-dark',
]

export const ThemesIcon =
[
  require('../icons/options/yellowTheme.png'),
  require('../icons/options/pinkTheme.png'),
  require('../icons/options/greyTheme.png'),
  require('../icons/options/yellowWhiteTheme.png'),
  require('../icons/options/redWhiteTheme.png'),
  require('../icons/options/blueWhiteTheme.png'),
  require('../icons/options/blueDark.png'),
  require('../icons/options/purpleDark.png'),
  require('../icons/options/orangeTheme.png'),
  require('../icons/options/redBlackTheme.png'),
  require('../icons/options/greenBlackTheme.png'),
  require('../icons/options/blueBlackTheme.png'),
]

function ThemeContextProvider({ children }){
    const [theme, setTheme] = useState(col[0].key);
    
    useEffect(() => {
      AsyncStorage.getItem('themeColor').then((v) => {
        if (v){
          setTheme(v);
        }
      });
    }, []);

    useEffect(() => {
      AsyncStorage.setItem('themeColor', theme);
    }, [theme]);
    
    const value = useMemo(
      () => ({
        theme,
        setTheme
      }),
      [theme, setTheme],
    );

    return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
    );
};

function useTheme(){
  const {theme, setTheme} = useContext(ThemeContext);
  const themeID = col.find(color => color.key === theme);
  const ThemeIcon = ThemesIcon[Themes.indexOf(theme) != -1 ? Themes.indexOf(theme) : 0];
  return(
    {theme, setTheme, themeID, ThemeIcon}
  );
};

export {useTheme}
export default ThemeContextProvider;