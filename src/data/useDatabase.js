import React, {useEffect} from 'react';

import {database} from './database'

export default function useDatabase() {
  const [isDBLoadingComplete, setDBLoadingComplete] = React.useState(false);

  useEffect(() => {
    async function loadDataAsync() {
      try {
        await database.dropTablesAsync();
        await database.setupDatabaseAsync();
        await database.addCatalog('brak katalogu',()=>{console.log("dodano podstawowy katalog");})

        setDBLoadingComplete(true);
      } catch (e) {
        console.warn(e);
      }
    }

    loadDataAsync();
  }, []);

  return isDBLoadingComplete;
}