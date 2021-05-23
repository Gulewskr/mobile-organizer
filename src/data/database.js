import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('baza3.db');

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

const getTask = ( taskID, setFunc) => {
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
    (t, error) => { console.log("db error load task by id") },
    (_t, _success) => { console.log("loaded task by id");}
  );
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

const getMoreTask = (taskID, setFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE connectedtask = ?;',
        [taskID],
        (_, { rows: { _array } }) => {setFunc(_array)}
      );
    },
    (t, error) => { console.log("db error load tasks by connected") },
    (_t, _success) => { console.log("loaded tasks by connected");}
  );
}

const addTask = (name, deadline, day, month, year, connectedid, successFunc) => {
    db.transaction( 
      tx => {
        tx.executeSql( "INSERT INTO tasks ( name, deadline, _year, _month, _day, ended, connectedTask, spec, endedP) VALUES (?,?,?,?,?,0,?,0,0);",
        [name, deadline ? 1:0, year, month, day, connectedid] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error);},
      (t, success) => { successFunc() }
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

  //console.log(polecenie);
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
          "create table if not exists tasks (id integer primary key AUTOINCREMENT not null, name TEXT, deadline bool, _year int, _month int, _day int, ended bool, connectedTask int, spec BOOL, endedP DOUBLE);  create table if not exists events (id integer primary key AUTOINCREMENT not null, name TEXT, type int, _year int, _month int, _day int, dayWeek INT, connectedTask integer, FOREIGN KEY(connectedtask) REFERENCES tasks(id)); create table if not exists notes (id integer primary key AUTOINCREMENT not null, name TEXT, value Text, connectedTask integer, connectedEvent integer, FOREIGN KEY(connectedtask) REFERENCES tasks(id), FOREIGN KEY(connectedEvent) REFERENCES events(id));"
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

const dropTablesAsync = async() => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "DROP TABLE IF EXISTS tasks; DROP TABLE IF EXISTS events; DROP TABLE IF EXISTS notes;"
        );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { resolve(success)}
    )
  })
}

export const database = {
  getTasks,
  getTask,
  getMoreTask,
  addTask,
  changeName,
  changeStatus,
  changeDeadline,
  deleteTask,
  sortTask,
  setupDatabaseAsync,
  dropTablesAsync
}