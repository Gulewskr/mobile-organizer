import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('baza3.db');

//---Ogólne---Ogólne---Ogólne---

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "create table if not exists tasks (id integer primary key AUTOINCREMENT not null, name TEXT, deadline bool, _year int, _month int, _day int, ended bool, connectedTask int, spec BOOL, endedP DOUBLE, connectedEvent integer, FOREIGN KEY(connectedEvent) REFERENCES events(id));"
        );
        tx.executeSql(
          "create table if not exists events (id integer primary key AUTOINCREMENT not null, name TEXT, type int, _year int, _month int, _day int, dayWeek TEXT, hour int, minute int, icon int);"
        );
        tx.executeSql(
          "create table if not exists catalogs (id integer primary key AUTOINCREMENT not null, name TEXT UNIQUE);"
        );
        tx.executeSql(
          "create table if not exists tags (name TEXT primary key UNIQUE not null);"
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
  });
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
          "DROP TABLE IF EXISTS tags;"
        );
        tx.executeSql(
          "DROP TABLE IF EXISTS events;"
        );
      },
      (_, error) => { console.log("ERROR: creating tables"); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const deleteData = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "DELETE FROM tagsConnection;"
        );
        tx.executeSql(
          "DELETE FROM notes;"
        );
        tx.executeSql(
          "DELETE FROM catalogs Where id IS NOT 1;"
        );
        tx.executeSql(
          "DELETE FROM tasks;"
        );
        tx.executeSql(
          "DELETE FROM tags;"
        );
        tx.executeSql(
          "DELETE FROM events;"
        );
      },
      (_, error) => { console.log("ERROR: deleting data"); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

//---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania---Zadania

//Pobieranie danych pojedynczego zadania
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

//pobranie wszystkich notatek
const getTasks = async (setFunc) => {
  await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT * FROM tasks;",
        [],
        (t,{rows:{ _array } }) => {setFunc(_array); resolve()});
      },
      (t, error) => { console.log("ERROR: geting all tasks"); reject(null);},
      (t, success) => { console.log("succed get all tasks");}
    );
  });
}

//Pobieranie podzadań pojedynczego zadania
const getMoreTask = async(taskID, setFunc) => {
  new Promise((resolve, reject) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE connectedtask = ?;',
        [taskID],
        (_, { rows: { _array } }) => {setFunc(_array)}
      );
    },
    (t, error) => { console.log("db error load tasks by connected"); reject(error)},
    (t, success) => { console.log("loaded tasks by connected"); resolve(success)}
  );
  });
}

//Zmiana nazwy zadania
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

//Usuwanie zadania
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

//Zmiana statusu zadania
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

//Zmiana deadlineu
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

//Dodawanie zadania
const addTask = (name, deadline, day, month, year, connectedid, connectedEvent, successFunc) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT INTO tasks ( name, deadline, _year, _month, _day, ended, connectedTask, spec, endedP, connectedEvent) VALUES (?,?,?,?,?,0,?,0,0,?);",
        [name, deadline ? 1:0, year, month, day, connectedid, connectedEvent] );
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

//sortowanie zadań według odpowiednich kryterii
const sortTask = (taskID, opt1, opt2, opt3, setFunc) => {
  var polecenie = 'SELECT * FROM tasks WHERE connectedTask = ' + taskID;
  switch(opt1){
    case 0: break;
    case 1: polecenie += ' AND deadline = 1 '; break;
    case 2: polecenie += ' AND deadline = 0 '; break;
    default: 
      console.log("ERROR: sortTask argument 1");
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
      console.log("ERROR: sortTask argument 2");
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
      console.log("ERROR: sortTask argument 3");
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
    (t, error) => { console.log("ERROR: sorting tasks") },
    (_t, _success) => { console.log("loaded sorted tasks");}
  );
}

//Odświeżenie postępu zadania
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
    (t, error) => { console.log("ERRPR: refreshing progress");},
    (t, success) => { console.log("refreshed task progress");}
    });
}


const changeTaskConnection = async(eID, tID, refreshFunc) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE tasks Set connectedEvent = ? WHERE id = ?;",
        [eID, tID]
        );
      },
      (t, error) => { console.log("ERROR: changing task connection"); reject(null)},
      (t, success) => { console.log("changed task connection"); refreshFunc(); resolve(success)}
    );
  });
}

//---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki---Notatki

//zmiana nazwy notatki
const changeNoteName = (id, name) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE notes Set name = ? WHERE id = ?;',
        [name, id]
      );
    },
    (t, error) => { console.log("ERROR: changing name for note");},
    (t, success) => { console.log("changed name for note"); }
  );
}

//dodawanie notatki z panelu
const addNoteFromPanel = async (name, catalogID, tagList, connectedTask, connectedEvent, refreshFunc) => {
  try {
    var id = await addNote(name, catalogID, connectedTask, connectedEvent);
    if(id != null)
      for(let i=0; i<tagList.length; i++)
      {
        await makeConnectionsToTag(id, tagList[i]);
      }
      refreshFunc();
  } catch (e) {
    console.warn(e);
  };
}

//dodawanie notatki
const addNote = async (name, catalogID, connectedTask, connectedEvent) => {
  return await new Promise((resolve, reject) => {
  db.transaction( 
    tx => {
      tx.executeSql( "INSERT into notes (name, value, connectedtask, connectedevent, catalog) values (?, '', ?, ?, ?);",
      [name, connectedTask, connectedEvent, catalogID],
      (tx, res) => {
        resolve(res.insertId); 
      });
    },
    (t, error) => { console.log("ERROR: adding Note"); reject(null)},
    (t, success) => { console.log("added Note");}
  );
});
}

//Dodanie połączeń notatki i jej tagów
const makeConnectionsToTag = async(note, tag) => {
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT into tagsConnection (tag, note) VALUES (?, ?);",
        [tag, note] );
      },
      (t, error) => { console.log("ERROR: db adding connection with tag"); reject(error)},
      (t, success) => { console.log("succed adding connection with tag"); resolve(success) }
    );
  });
}

//dodawniae katalogu
const addCatalog = async (name) => {
  new Promise((resolve, reject) => {
  db.transaction( 
    tx => {
      tx.executeSql( "INSERT or IGNORE into catalogs (name) values (?);",
      [name] );
    },
    (t, error) => { console.log("ERROR: db adding Catalog"); reject(error)},
    (t, success) => { console.log("succed adding Catalog"); resolve(success) }
  );
});
}

//pobieranie listy katalogów
const getCatalogs = async() => {
  return await new Promise((resolve, reject) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM catalogs;',
        [],
        (t,{rows:{ _array } }) => {resolve(_array);});
    },
    (t, error) => { console.log("ERROR: db loading catalogs"); reject(null);},
    (_t, _success) => { console.log("loaded catalogs");}
  );
  });
}

//pobieranie listy notatek z danego katalogu
const getNotesFromCatalog = async (id, command) => {
  return await new Promise((resolve, reject) => {
    let c = "SELECT * FROM notes WHERE catalog = ";
    c += id + " ";
    c += command;
    c += ";";
    console.log(c);
      db.transaction(
        tx => {
          tx.executeSql( c,
          [],
          (t,{rows:{ _array } }) => {resolve(_array);});
        },
        (t, error) => { reject("ERROR: geting catalog notes");},
        (t, success) => { console.log("succed get catalog notes");}
      );
  });
}

//pobieranie notatki o danym id
const getNote = async (id) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT * FROM notes WHERE id = ?;",
        [id],
        (t,{rows:{ _array } }) => {resolve(_array);});
      },
      (t, error) => { console.log("ERROR: geting note by id"); reject(null);},
      (t, success) => { console.log("succed get note by id");}
    );
  });
}

//pobranie wszystkich notatek
const getNotes = async (setFunc) => {
  await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT * FROM notes;",
        [],
        (t,{rows:{ _array } }) => {setFunc(_array); resolve()});
      },
      (t, error) => { console.log("ERROR: geting all notes"); reject(null);},
      (t, success) => { console.log("succed get all notes");}
    );
  });
}


//pobranie tagów notatki o danym id
const getTagsByID = async (id) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT * FROM tagsConnection WHERE note = ?;",
        [id],
        (t,{rows:{ _array } }) => {resolve(_array);});
      },
      (t, error) => { console.log("ERROR: geting tags by note id"); reject(null);},
      (t, success) => { console.log("succed got tags for note");}
    );
  });
}

//pobranie wszystkich tagów do menu filtrów
const getTags = async () => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "SELECT * FROM tags;",
        [],
        (t,{rows:{ _array } }) => {resolve(_array);});
      },
      (t, error) => { console.log("ERROR: geting tags"); reject(null);},
      (t, success) => { console.log("succed got tags");}
    );
  });
}

//dodatnie tagu do bazy danych
const addTag = async (name) => {
  new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT or IGNORE into tags (name) values (?);",
        [name] );
      },
      (t, error) => { console.log("db error wtf adding tag"); console.log(error); reject(error)},
      (t, success) => { console.log("succed adding tag"); resolve(success) }
    );
  });
}

//zmiana treści notatki
const setNote = async(noteID, text) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE notes Set value = ? WHERE id = ?;",
        [text, noteID]
        );
      },
      (t, error) => { console.log("ERROR: changing note"); reject(null)},
      (t, success) => { console.log("changed note"); resolve(success)}
    );
  });
}

//zmiana katalogu dla notatki
const changeNoteCatalog = async(noteID, newCatalogID) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE notes Set catalog = ? WHERE id = ?;",
        [newCatalogID, noteID]
        );
      },
      (t, error) => { console.log("ERROR: changing note catalog"); reject(null)},
      (t, success) => { console.log("changed note catalog"); resolve(success)}
    );
  });
}

const changeNoteConnectionT = async(tID, noteID, refreshFunc) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE notes Set connectedTask = ? WHERE id = ?;",
        [tID, noteID]
        );
      },
      (t, error) => { console.log("ERROR: changing note connection"); reject(null)},
      (t, success) => { console.log("changed note connection"); refreshFunc(); resolve(success)}
    );
  });
}

const changeNoteConnectionE = async(eID, noteID, refreshFunc) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "UPDATE notes Set connectedEvent = ? WHERE id = ?;",
        [eID, noteID]
        );
      },
      (t, error) => { console.log("ERROR: changing note connection"); reject(null)},
      (t, success) => { console.log("changed note connection"); refreshFunc(); resolve(success)}
    );
  });
}

//usunięcie tagu z notatki
const deleteTagConnection = async(noteID, tag) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM tagsConnection WHERE note = ? AND tag = ?;",
        [noteID, tag]
        );
      },
      (t, error) => { console.log("ERROR: deleting tag connection"); reject(null)},
      (t, success) => { console.log("deleted tag connection"); resolve(success)}
    );
  });
}

//usunięcie połączeń tagu
const deleteTagConnections = async(tag) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM tagsConnection WHERE tag = ?;",
        [tag]
        );
      },
      (t, error) => { console.log("ERROR: deleting tag connection"); reject(null)},
      (t, success) => { console.log("deleted tag connection"); resolve(success)}
    );
  });
}

//usunięcie tagu
const deleteTag = async(tag) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM tags WHERE name = ?;",
        [tag]
        );
      },
      (t, error) => { console.log("ERROR: deleting tag "); reject(null)},
      (t, success) => { console.log("deleted tag "); resolve(success)}
    );
  });
}

//usunięcie notatki
const deleteNote = async( noteID ) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM notes WHERE id = ?;",
        [noteID]
        );
      },
      (t, error) => { console.log("ERROR: deleting note"); reject(null)},
      (t, success) => { console.log("deleted note"); resolve(success)}
    );
  });
}

//usuwanie notatek z katalogu
const deleteNoteFromCatalog = async( catalogID ) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM notes WHERE catalog = ?;",
        [catalogID]
        );
      },
      (t, error) => { console.log("ERROR: deleting notes from catalog"); reject(null)},
      (t, success) => { console.log("deleted notes from catalog " + catalogID); resolve(success)}
    );
  });
}

//usuwanie katalogu
const deleteCatalog = async( catalogID ) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM catalogs WHERE id = ?;",
        [catalogID]
        );
      },
      (t, error) => { console.log("ERROR: deleting catalog"); reject(null)},
      (t, success) => { console.log("deleted catalog " + catalogID); resolve(success)}
    );
  });
}

//---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia---Wydarzenia

//dodawanie wydarzenia
const addEvent = async(name, type, _year, _month, _day, dayWeek, hour, minute, icon, refreshEvents) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql("INSERT INTO events (name, type, _year, _month, _day, dayWeek, hour, minute, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [name, type, _year, _month, _day, dayWeek, hour, minute, icon]);
    },
    (t, error) => { console.log("ERROR: creating event"); reject(null)},
    (t, success) => { console.log("created event"); refreshEvents(); resolve(success)}
    );
  });
}

//zmiana nazwy
const changeEventName = (id, name, succFuc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE events Set name = ? WHERE id = ?;',
        [name, id]
      );
    },
    (t, error) => { console.log("ERROR: changing name for event");},
    (t, success) => { console.log("changed name for event"); succFuc()}
  );
}

//zmiana daty
const changeEventDate = (id, _year, _month, _day, hour, minute, succFuc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE events Set _year = ?, _month = ?, _day = ?, hour = ?, minute = ?  WHERE id = ?;',
        [_year, _month, _day, hour, minute, id]
      );
    },
    (t, error) => { console.log("ERROR: changing data for event");},
    (t, success) => { console.log("changed data for event"); succFuc()}
  );
}

//zmiana dni dla cotygodniowego
const changeEventDays = (id, week, succFuc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE events Set dayWeek = ?  WHERE id = ?;',
        [week, id]
      );
    },
    (t, error) => { console.log("ERROR: changing days for event");},
    (t, success) => { console.log("changed days for event"); succFuc()}
  );
}

//zmiana ikony
const changeEventIcon = (id, icon, succFuc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE events Set icon = ?  WHERE id = ?;',
        [icon, id]
      );
    },
    (t, error) => { console.log("ERROR: changing icon for event");},
    (t, success) => { console.log("changed icon for event"); succFuc() }
  );
}

//usuwanie wydarzenia
const deleteEvent = async( eventID ) => {
  return await new Promise((resolve, reject) => {
    db.transaction( 
      tx => {
        tx.executeSql( "DELETE FROM events WHERE id = ?;",
        [eventID]
        );
      },
      (t, error) => { console.log("ERROR: deleting events"); reject(null)},
      (t, success) => { console.log("deleted events " + eventID); resolve(success)}
    );
  });
}

//pobieranie listy wydarzeń
const getEvents = async(setFunc) => {
  new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM events;',
          [],
          (_, { rows: { _array } }) => { setFunc(_array);}
        );
      },
      (t, error) => { console.log("db error load task by id"); reject(error) },
      (t, success) => { console.log("loaded task by id"); resolve('success')}
    );
  });
}


//export funkcji bazy danych
export const database = {
  addCatalog,
  addEvent,
  addNoteFromPanel,
  addTag,
  addTask,
  changeName,
  changeStatus,
  changeDeadline,
  changeEventName,
  changeEventDate,
  changeEventDays,
  changeEventIcon,
  changeNoteName,
  changeNoteConnectionT,
  changeNoteConnectionE,
  changeTaskConnection,
  changeNoteCatalog,
  deleteCatalog,
  deleteData,
  deleteEvent,
  deleteNote,
  deleteNoteFromCatalog,
  deleteTask,
  deleteTag,
  deleteTagConnection,
  deleteTagConnections,
  dropTablesAsync,
  getCatalogs,
  getEvents,
  getTask,
  getTasks,
  getTags,
  getTagsByID,
  getMoreTask,
  getNote,
  getNotes,
  getNotesFromCatalog,
  makeConnectionsToTag,
  sortTask,
  setNote,
  setupDatabaseAsync
}