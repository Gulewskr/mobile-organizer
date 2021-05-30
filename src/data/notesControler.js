import React from 'react'
import {nameOfMonths, nameOfDays, numberOfDays} from './calendar';

const getNotesForEvent = (notes, eventID) => {
    if(Array.isArray(notes)){
        var n = [];
        for(let i = 0; i<notes.length; i++){
            if(notes[i].connectedEvent == eventID){
                n.push(notes[i]);
            } 
        }
    }
    return n;
}

const getNotesForTask= (notes, taskID) => {
    if(Array.isArray(notes)){
        var n = [];
        for(let i = 0; i<notes.length; i++){
            if(notes[i].connectedTask == taskID){
                n.push(notes[i]);
            } 
        }
    }
    return n;
}

//export funkcji bazy danych
export const notesControl = {
    getNotesForEvent,
    getNotesForTask,
}