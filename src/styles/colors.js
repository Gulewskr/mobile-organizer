import React, {createContext,  useContext, useMemo, useState } from 'react';
import col from "./colors.json";

export const ThemeContext = createContext();


function ThemeContextProvider({ children }){
    const [theme, setTheme] = useState(col[0].key); 
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
  return(
    {theme, setTheme, themeID}
  );
};

export {useTheme}
export default ThemeContextProvider;