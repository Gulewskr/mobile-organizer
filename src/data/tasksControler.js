import React from 'react'
import {nameOfMonths, nameOfDays, numberOfDays} from './calendar';

const getTaskForEvent = (tasks, eventID) => {
    var n = [];
    if(Array.isArray(tasks)){
        for(let i = 0; i<tasks.length; i++){
            if(tasks[i].id == eventID){
                n.push(tasks[i]);
            } 
        }
    }
    return n;
}

const getTaskThisMonth = (tasks, month, year) => {
    var n = [];
    if(Array.isArray(tasks)){
        for(let i = 0; i<tasks.length; i++){
            if(tasks[i].deadline && tasks[i]._month == month && tasks[i]._year == year){
                n.push(tasks[i]);
            } 
        }
    }
    return n;
}

//export funkcji bazy danych
export const taskControl = {
    getTaskForEvent,
    getTaskThisMonth,
}