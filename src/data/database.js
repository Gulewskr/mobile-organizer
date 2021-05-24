import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('baza3.db');

/*
const getTasks = ( setFunc ) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from tasks',
        [],
        (_, { rows: { _array } }) => {
          setFunc(_array)
        }
      );
    },
    (t, error) => { console.log("db error load tasks"); console.log(error) },
    (_t, _success) => { console.log("loaded tasks");}
  );
}
*/

//Pobieranie danych - zadania
const getTask = async( taskID, setFunc) => {
  new Promise((resolve, reject) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE id = ?;',
        [taskID],
        (_, { rows: { _array } }) => {
          setFunc(_array[0])
        }
      );
    },
    (t, error) => { console.log("db error load task by id"); reject(error) },
    (t, success) => { console.log("loaded task by id"); resolve('success')}
  );
  });
}

const getMoreTask = async(taskID, setFunc) => {
  new Promise((resolve, reject) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE connectedtask = ?;',
        [taskID],
        (_, { rows: { _array } }) => {console.log(_array); setFunc(_array)}
      );
    },
    (t, error) => { console.log("db error load tasks by connected"); reject(error)},
    (t, success) => { console.log("loaded tasks by connected"); resolve(success)}
  );
  });
}

//zmiana nazwy zadania
const changeName = (taskID, name, successFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE tasks Set name = ? WHERE id = ?;',
        [name, taskID]
      );
    },
    (t, error) => { console.log("db error changeName"); console.log(error);},
    (t, success) => { successFunc() }
  );
}

//usuwanie zadania
const deleteTask = (taskID, successFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'DELETE FROM tasks WHERE id = ? OR connectedtask = ?;',
        [taskID, taskID]
      );
    },
    (t, error) => { console.log("db error deleteTask"); console.log(error);},
    (t, success) => { successFunc() }
  );
}

//zmiana statusu zadania
const changeStatus = (taskID, status, successFunc, parrentTask) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE tasks Set ended = ? WHERE id = ?;',
        [status, taskID]
      );
    },
    (t, error) => { console.log("db error changeStatus"); console.log(error);},
    (t, success) => { successFunc() }
  );
  refreshTaskProgress(parrentTask);
}

//zmiana deadlineu
const changeDeadline = (taskID, deadline, day, month, year, successFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE tasks Set deadline = ?, _day = ?, _month = ?, _year = ? WHERE id = ?;',
        [deadline, day, month, year, taskID]
      );
    },
    (t, error) => { console.log("db error changeDeadline"); console.log(error);},
    (t, success) => { successFunc() }
  );
}

//dodawanie zadania
const addTask = (name, deadline, day, month, year, connectedid, successFunc) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT INTO tasks ( name, deadline, _year, _month, _day, ended, connectedTask, spec, endedP) VALUES (?,?,?,?,?,0,?,0,0);",
        [name, deadline ? 1:0, year, month, day, connectedid] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error);},
      (t, success) => { console.log("added task"); successFunc() }
    );
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE tasks Set spec = 1 WHERE id = ?;",
        [connectedid] );
      },
      (t, error) => { console.log("db error update specified task");},
      (t, success) => { console.log("db succed update specified task");}
    )
    refreshTaskProgress(connectedid);
}

//dodawanie notatki z panelu
const addNoteFromPanel = async (name, catalogID, tagList, connectedTask, connectedEvent, successFunc) => {
  try {
    //await addCatalog(catalogName);
    await addTags(tagList);
    await addNote(name, catalogID, connectedTask, connectedEvent);
    successFunc();
    await makeConnectionsToTag(name, tagList);
  } catch (e) {
    console.warn(e);
  };
  db.transaction( 
    tx => {
      tx.executeSql( "INSERT or IGNORE into catalogs (name) values (?);",
      [name] );
    },
    (t, error) => { console.log("db error addingCatalog"); console.log(error);},
    (t, success) => { console.log("succed addingCatalog") }
  );
}

//dodawanie notatki
const addNote = async (name, catalogID, connectedTask, connectedEvent) => {
  new Promise((resolve, reject) => {
  db.transaction( 
    tx => {
      tx.executeSql( "INSERT into notes (name, value, connectedtask, connectedevent, catalog) values (?, '', ?, ?, ?);",
      [name, connectedTask, connectedEvent, catalogID] );
    },
    (t, error) => { console.log("db error addingNote"); console.log(error); reject(error)},
    (t, success) => { console.log("succed addingNote"); resolve(success) }
  );
});
}

/*
//otrzymanie id notatki z nazwy
const getNoteID = async (name) => {
  var results;
  new Promise((resolve, reject) => {
  db.transaction( 
    tx => {
      tx.executeSql( "SELECT id FROM notes where name = ?;",
      [name],
      (_, { rows: { _array } }) => {results = [..._array]}
    );
    },
    (t, error) => { console.log("db error addingNote"); console.log(error); reject(error)},
    (t, success) => { console.log("succed addingNote"); resolve(results) }
  );
});
}*/

const makeConnectionsToTag = async(noteName, tags) => {
  var command = "";
  for(let i=0; i<tags.length; i++)
  {//insert into tagsConnection (tag, note) SELECT id, "lol" frOM catalogs where name = "kox"
    command += "INSERT into tagsConnection (tag, note) SELECT "+tags[i]+", id from notes where name = "+noteName+";";
  }
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( command,
        [] );
      },
      (t, error) => { console.log("db error addingCatalog"); console.log(error); reject(error)},
      (t, success) => { console.log("succed addingCatalog"); resolve(success) }
    );
  });
}

//dodawniae katalogu
const addCatalog = async (name, successFunc) => {
  console.log(name);
  new Promise((resolve, reject) => {
  db.transaction( 
    tx => {
      tx.executeSql( "INSERT or IGNORE into catalogs (name) values (?);",
      [name] );
    },
    (t, error) => { console.log("db error adding Catalog"); console.log(error); reject(error)},
    (t, success) => { console.log("succed adding Catalog"); successFunc(); resolve(success) }
  );
});
}

const getCatalogs = (setFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM catalogs;',
        [],
        (_, { rows: { _array } }) => {setFunc(_array)}
      );
    },
    (t, error) => { console.log("db error load catalogs") },
    (_t, _success) => { console.log("loaded catalogs");}
  );
}

//dodawania listy tagów
const addTags = async (tags) => {
  var command = " ";
  if(tags != undefined && tags != null && tags.length > 0)
  {
    for(let i = 0; i < tags.length; i++)
    {
      command += "INSERT or IGNORE into catalogs (name) values (" + tags[i] + ");";
    }
  }
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( command,
        [] );
      },
      (t, error) => { console.log("db error adding Catalog"); console.log(error); reject(error)},
      (t, success) => { console.log("succed adding Catalog"); resolve(success) }
    );
  });
}

const addTag = async (name) => {
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT or IGNORE into tags (name) values (?);",
        [name] );
      },
      (t, error) => { console.log("db error wtf adding tag"); console.log(error); reject(error)},
      (t, success) => { console.log("succed adding tag"); successFunc(); resolve(success) }
    );
  });
}

/*
//dodawania listy tagów
const getTags = async (tags, setFunc) => {
  var command = " ";
  if(tags != undefined && tags != null && tags.length > 0)
  {
    command += tags[0];
    for(let i = 1; i < tags.length; i++)
    {
      command += ", " + tags[i];
    }
  }
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT id FROM tags WHERE name IN (?)",
        [command],
        (_, { rows: { _array } }) => { setFunc(_array) }
      );
      },
      (t, error) => { console.log("db error gettingTags"); console.log(error); reject(error)},
      (t, success) => { console.log("succed gettingTags"); resolve(success) }
    );
  });
}*/

//sortowanie zadan
const sortTask = (taskID, opt1, opt2, opt3, setFunc) => {
  var polecenie = 'SELECT * FROM tasks WHERE connectedTask = ' + taskID;
  switch(opt1){
    case 0: break;
    case 1: polecenie += ' AND deadline = 1 '; break;
    case 2: polecenie += ' AND deadline = 0 '; break;
    default: 
      console.log("error with db sortTask arguments opt1");
      return;
  }
  switch(opt2){
    case 0: if(opt3 != 0){polecenie += ' ORDER by '} break;
    case 1: 
      polecenie += ' ORDER by name DESC'; 
      break;
    case 2: 
      polecenie += ' ORDER by name ASC';
      break;
    default:
      console.log("error with db sortTask arguments opt2");
      return;
  }
  switch(opt3){
    case 0: break;
    case 1: 
      if(opt2 != 0){polecenie += ','};  
      polecenie += '_year DESC, _month DESC, _day DESC';
      break;
    case 2: 
      if(opt2 != 0){polecenie += ','};  
      polecenie += '_year ASC, _month ASC, _day ASC';
      break;
    default:
      console.log("error with db sortTask arguments opt3");
      return;
  }

  db.transaction(
    tx => {
      tx.executeSql(
        polecenie,
        [],
        (_, { rows: { _array } }) => {setFunc(_array)}
      );
    },
    (t, error) => { console.log("db error with sorting tasks") },
    (_t, _success) => { console.log("loaded sorted tasks");}
  );
}

const refreshTaskProgress = (id) => {
  db.transaction( 
    tx => {
    tx.executeSql( "UPDATE tasks Set endedP = (100*(SELECT COUNT(*) FROM tasks WHERE connectedtask = ? AND ended = 1)/(SELECT COUNT(*) FROM tasks WHERE connectedtask = ?)) WHERE id = ?;",
     [id, id, id] );    
  },);
  db.transaction( 
    tx => {
      tx.executeSql("UPDATE tasks set ended = case When ((100*(SELECT COUNT(*) FROM tasks WHERE connectedtask = ? AND ended = 1)/(SELECT COUNT(*) FROM tasks WHERE connectedtask = ?)) = 100 ) then 1 else 0 end WHERE id = ?;",
      [id, id, id] ); 
    (t, error) => { console.log("db error refresh progress"); console.log(error);},
    (t, success) => { console.log("refreshed task progress");}
    });
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "create table if not exists tasks (id integer primary key AUTOINCREMENT not null, name TEXT, deadline bool, _year int, _month int, _day int, ended bool, connectedTask int, spec BOOL, endedP DOUBLE);"
        );
        tx.executeSql(
          "create table if not exists events (id integer primary key AUTOINCREMENT not null, name TEXT, type int, _year int, _month int, _day int, dayWeek INT, connectedTask integer, FOREIGN KEY(connectedtask) REFERENCES tasks(id));"
        );
        tx.executeSql(
          "create table if not exists catalogs (id integer primary key AUTOINCREMENT not null, name TEXT UNIQUE); create table if not exists tags (id integer primary key AUTOINCREMENT not null, name TEXT UNIQUE);"
        );
        tx.executeSql(
          "create table if not exists tags (id integer primary key AUTOINCREMENT not null, name TEXT UNIQUE); create table if not exists tags (id integer primary key AUTOINCREMENT not null, name TEXT UNIQUE);"
        );
        tx.executeSql(
          "create table if not exists notes (id integer primary key AUTOINCREMENT not null, name TEXT, value Text, connectedTask integer, connectedEvent integer, catalog Integer, FOREIGN KEY(catalog) REFERENCES catalogs(id), FOREIGN KEY(connectedtask) REFERENCES tasks(id), FOREIGN KEY(connectedEvent) REFERENCES events(id));"
        );
        tx.executeSql(
          "create table if not exists tagsConnection (tag TEXT, note integer, FOREIGN KEY(tag) REFERENCES tags(id), FOREIGN KEY(note) REFERENCES notes(id));"
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { console.log("created tables"); resolve(success)}
    )
  })
}

const dropTablesAsync = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "DROP TABLE IF EXISTS tagsConnection;"
        );
        tx.executeSql(
          "DROP TABLE IF EXISTS notes;"
        );
        tx.executeSql(
          "DROP TABLE IF EXISTS catalogs;"
        );
        tx.executeSql(
          "DROP TABLE IF EXISTS tasks;"
        );
        tx.executeSql(
          "DROP TABLE IF EXISTS events;"
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

export const database = {
  addCatalog,
  addNoteFromPanel,
  addTag,
  addTask,
  changeName,
  changeStatus,
  changeDeadline,
  deleteTask,
  dropTablesAsync,
  getCatalogs,
  getTask,
  getMoreTask,
  sortTask,
  setupDatabaseAsync
}